import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollService } from '../../../core/services/scroll.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-footer',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="footer" role="contentinfo">
      <div class="footer__inner">
        <!-- Brand -->
        <div class="footer__col">
          <p class="footer__logo">
            UNSTOPPABLE <span class="footer__logo-accent">FITNESS</span>
          </p>
          <p class="footer__tagline">
            Forge your limits every single day updated.<br />Nashik's most intense gym experience.
          </p>
          <div class="footer__social" role="list">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              class="footer__social-link"
              role="listitem"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.8"/>
                <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>
              </svg>
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Facebook"
              class="footer__social-link"
              role="listitem"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M18 2H15a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
              </svg>
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Subscribe on YouTube"
              class="footer__social-link"
              role="listitem"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="2" y="5" width="20" height="14" rx="3" stroke="currentColor" stroke-width="1.8"/>
                <path d="M10 9l5 3-5 3V9z" fill="currentColor"/>
              </svg>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="footer__col">
          <h3 class="footer__heading">Quick Links</h3>
          <nav aria-label="Footer navigation">
            @for (link of quickLinks; track link.section) {
              <button class="footer__link" (click)="navigate(link.section)">
                {{ link.label }}
              </button>
            }
          </nav>
        </div>

        <!-- Contact Info -->
        <div class="footer__col">
          <h3 class="footer__heading">Contact</h3>
          <address class="footer__address">
            <p>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="1.8"/>
                <circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="1.8"/>
              </svg>
              {{ address }}
            </p>
            <p>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.63A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="1.8"/>
              </svg>
              <a href="tel:+919876543210">{{ phone }}</a>
            </p>
            <p>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" stroke-width="1.8"/>
                <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="1.8"/>
              </svg>
              <a href="mailto:Unstoppablefitness.nashik@gmail.com">{{ email }}</a>
            </p>
            <p class="footer__hours">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>
                <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
              </svg>
              <span>Mon–Sat: 5:30 AM – 10:00 PM<br />Sunday: 7:00 AM – 1:00 PM</span>
            </p>
          </address>
        </div>
      </div>

      <!-- Bottom bar -->
      <div class="footer__bottom">
        <p>© 2025 Unstoppable Fitness, Nashik. All rights reserved.</p>
        <p class="footer__built">
          Built with
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#dd1b16" aria-label="Angular" role="img">
            <path d="M12 2L2 6.5l1.5 12L12 22l8.5-3.5L22 6.5z"/>
          </svg>
          Angular
        </p>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  private scrollService = inject(ScrollService);

  readonly address = environment.address;
  readonly phone = environment.phone;
  readonly email = environment.email;

  readonly quickLinks = [
    { label: 'Home', section: 'hero' },
    { label: 'Programs', section: 'programs' },
    { label: 'Membership Plans', section: 'membership' },
    { label: 'Our Trainers', section: 'trainers' },
    { label: 'Gallery', section: 'gallery' },
    { label: 'Contact Us', section: 'contact' },
  ];

  navigate(section: string): void {
    this.scrollService.scrollToSection(section);
  }
}
