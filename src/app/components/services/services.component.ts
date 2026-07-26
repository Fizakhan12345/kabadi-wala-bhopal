import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Service {
  title: string;
  titleHi: string;
  desc: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  readonly services: Service[] = [
    {
      title: 'Free Doorstep Pickup',
      titleHi: 'मुफ्त पिकअप',
      desc: 'Call or WhatsApp us your address — our team weighs and collects scrap right at your gate, no charge for pickup.',
    },
    {
      title: 'Digital Weighing Scale',
      titleHi: 'सही तौल',
      desc: 'Every item is weighed on a calibrated digital scale in front of you, so the kilo you see is the kilo you get paid for.',
    },
    {
      title: 'Instant Cash Payment',
      titleHi: 'तुरंत भुगतान',
      desc: 'Get paid on the spot — cash or UPI, whichever you prefer — the moment your scrap is weighed and confirmed.',
    },
    {
      title: 'All Types of Scrap',
      titleHi: 'हर तरह का कबाड़',
      desc: 'Metal, paper, plastic, old appliances, e-waste, furniture — one call covers everything you want cleared out.',
    },
  ];
}
