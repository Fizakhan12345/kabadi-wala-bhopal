import { Injectable, signal } from '@angular/core';
import { RATE_CATEGORIES, RateCategory, Trend } from './rates.data';
import { KABADI_MARGIN, KG_PER_LB, LIVE_METALS_API_URL, USD_TO_INR } from './api-metals.config';

export type LiveStatus = 'idle' | 'loading' | 'live' | 'unavailable';

@Injectable({ providedIn: 'root' })
export class RatesLiveService {
  /** Categories consumed by the whole site. Starts as the manual fallback data. */
  readonly categories = signal<RateCategory[]>(structuredClone(RATE_CATEGORIES));
  readonly status = signal<LiveStatus>('idle');
  readonly lastFetchedAt = signal<Date | null>(null);

  constructor() {
    this.refreshLiveMetals();
  }

  async refreshLiveMetals(): Promise<void> {
    this.status.set('loading');
    try {
      const res = await fetch(LIVE_METALS_API_URL);
      if (!res.ok) throw new Error(`Live metals API responded ${res.status}`);

      const payload: Array<Record<string, number>> = await res.json();
      const priceByMetal: Record<string, number> = {};
      for (const entry of payload) {
        for (const [key, value] of Object.entries(entry)) {
          if (typeof value === 'number') priceByMetal[key.toLowerCase()] = value;
        }
      }

      this.categories.update((cats) =>
        cats.map((cat) => ({
          ...cat,
          items: cat.items.map((item) => {
            if (!item.liveKey || !(item.liveKey in priceByMetal)) return item;

            const usdPerLb = priceByMetal[item.liveKey];
            const usdPerKg = usdPerLb / KG_PER_LB;
            const inrPerKg = usdPerKg * USD_TO_INR;
            const margin = KABADI_MARGIN[item.liveKey] ?? 1;
            const newRate = Math.round(inrPerKg * margin);

            const storageKey = `kwb-live-${item.liveKey}`;
            const prevRate = Number(localStorage.getItem(storageKey)) || undefined;
            let trend: Trend = item.trend;
            if (prevRate) trend = newRate > prevRate ? 'up' : newRate < prevRate ? 'down' : 'flat';
            localStorage.setItem(storageKey, String(newRate));

            return { ...item, rate: newRate, trend, isLive: true };
          }),
        }))
      );

      this.status.set('live');
      this.lastFetchedAt.set(new Date());
    } catch (err) {
      // Network hiccup, ad-blocker, or the free quota is exhausted — fall back
      // to the manual rates already in rates.data.ts. The site still works.
      console.warn('Live metal price fetch failed, showing manual fallback rates.', err);
      this.status.set('unavailable');
    }
  }
}
