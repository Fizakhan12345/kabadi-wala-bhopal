import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TICKER_ITEMS } from '../../data/rates.data';
import { RatesLiveService } from '../../data/rates-live.service';
import { SITE } from '../../data/site.data';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.scss',
})
export class HeroComponent {
  readonly site = SITE;
  private ratesLive = inject(RatesLiveService);

  readonly tickerItems = computed(() =>
    this.ratesLive
      .categories()
      .flatMap((c) => c.items)
      .filter((item) => TICKER_ITEMS.includes(item.nameEn))
  );

  // duplicated once for a seamless CSS-marquee loop
  readonly loopItems = computed(() => [...this.tickerItems(), ...this.tickerItems()]);
}
