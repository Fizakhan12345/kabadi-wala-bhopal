import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SITE } from '../../data/site.data';

@Component({
  selector: 'app-why-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.scss',
})
export class WhyUsComponent {
  readonly site = SITE;

  readonly points = [
    'Rates checked against Bhopal market prices every morning — no lowballing.',
    'Licensed weighing equipment, checked and verified in front of you.',
    'Same-day pickup across most Bhopal localities, including evenings.',
    'Bulk clearance for offices, shops, factories and housing societies.',
  ];
}
