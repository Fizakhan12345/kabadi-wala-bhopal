import { Component, signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RATE_CATEGORIES, RATES_UPDATED_ON } from '../../data/rates.data';
import { RatesLiveService } from '../../data/rates-live.service';

@Component({
  selector: 'app-rate-board',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rate-board.component.html',
  styleUrl: './rate-board.component.scss',
})
export class RateBoardComponent {
  private ratesLive = inject(RatesLiveService);

  readonly categories = this.ratesLive.categories;
  readonly liveStatus = this.ratesLive.status;
  readonly updatedOn = RATES_UPDATED_ON;

  activeId = signal(RATE_CATEGORIES[0].id);

  activeCategory = computed(
    () => this.categories().find((c) => c.id === this.activeId()) ?? this.categories()[0]
  );

  setActive(id: string) {
    this.activeId.set(id);
  }

  get formattedDate(): string {
    return this.updatedOn.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }
}
