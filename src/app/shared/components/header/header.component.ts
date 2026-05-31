import {
  Component,
  OnInit,
  OnDestroy,
  HostListener,
  signal,
  inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { A11yModule } from '@angular/cdk/a11y';
import { ScrollService } from '../../../core/services/scroll.service';

interface NavLink {
  label: string;
  section: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [A11yModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main-content">Skip to main content</a>

    <header
      class="header"
      [class.header--scrolled]="isScrolled()"
      role="banner"
    >
      <div class="header__inner">
        <!-- Logo -->
        <button
          class="header__logo"
          (click)="navigateTo('hero')"
          aria-label="Unstoppable Fitness – go to top"
        >
          UNSTOPPABLE <span class="header__logo-accent">FITNESS</span>
        </button>

        <!-- Desktop nav -->
        <nav class="header__nav" aria-label="Main navigation">
          @for (link of navLinks; track link.section) {
            <button
              class="header__nav-link"
              [class.header__nav-link--active]="activeSection() === link.section"
              (click)="navigateTo(link.section)"
            >
              {{ link.label }}
            </button>
          }
          <button
            class="header__cta btn btn--primary btn--sm"
            (click)="navigateTo('contact')"
          >
            Free Trial
          </button>
        </nav>

        <!-- Hamburger -->
        <button
          class="header__hamburger"
          [class.header__hamburger--open]="isMenuOpen()"
          (click)="toggleMenu()"
          [attr.aria-expanded]="isMenuOpen()"
          aria-controls="mobile-menu"
          aria-label="Toggle navigation menu"
        >
          <span class="header__hamburger-bar"></span>
          <span class="header__hamburger-bar"></span>
          <span class="header__hamburger-bar"></span>
        </button>
      </div>
    </header>

    <!-- Mobile Drawer -->
    @if (isMenuOpen()) {
      <div
        class="mobile-overlay"
        (click)="closeMenu()"
        aria-hidden="true"
      ></div>
      <nav
        id="mobile-menu"
        class="mobile-menu"
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="true"
        aria-label="Mobile navigation"
      >
        <div class="mobile-menu__header">
          <span class="header__logo">
            UNSTOPPABLE <span class="header__logo-accent">FITNESS</span>
          </span>
          <button
            class="mobile-menu__close"
            (click)="closeMenu()"
            aria-label="Close menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>
        </div>
        @for (link of navLinks; track link.section) {
          <button
            class="mobile-menu__link"
            [class.mobile-menu__link--active]="activeSection() === link.section"
            (click)="navigateTo(link.section)"
          >
            {{ link.label }}
          </button>
        }
        <button
          class="btn btn--primary btn--lg mobile-menu__cta"
          (click)="navigateTo('contact')"
        >
          Start Free Trial
        </button>
      </nav>
    }
  `,
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private scrollService = inject(ScrollService);

  readonly isScrolled = signal(false);
  readonly isMenuOpen = signal(false);
  readonly activeSection = this.scrollService.activeSection;

  readonly navLinks: NavLink[] = [
    { label: 'Home', section: 'hero' },
    { label: 'Programs', section: 'programs' },
    { label: 'Plans', section: 'membership' },
    { label: 'Trainers', section: 'trainers' },
    { label: 'Gallery', section: 'gallery' },
    { label: 'Contact', section: 'contact' },
  ];

  private readonly sectionIds = this.navLinks.map((l) => l.section);

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 50);
    this.scrollService.updateActiveSectionFromScroll(this.sectionIds);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.closeMenu();
  }

  navigateTo(section: string): void {
    this.closeMenu();
    this.scrollService.scrollToSection(section);
  }

  toggleMenu(): void {
    this.isMenuOpen.update((v) => !v);
  }

  closeMenu(): void {
    this.isMenuOpen.set(false);
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {}
}
