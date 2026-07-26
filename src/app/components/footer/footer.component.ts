import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SITE } from '../../data/site.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly site = SITE;
  readonly year = new Date().getFullYear();
}
