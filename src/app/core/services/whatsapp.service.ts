import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  buildUrl(message?: string): string {
    const text =
      message ??
      `Hi ${environment.businessName}! I'm interested in joining your gym.`;
    return `https://wa.me/${environment.whatsappNumber}?text=${encodeURIComponent(text)}`;
  }

  openChat(message?: string): void {
    window.open(this.buildUrl(message), '_blank', 'noopener,noreferrer');
  }
}
