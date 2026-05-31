import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  signal,
  inject,
  WritableSignal,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { ScrollService } from '../../core/services/scroll.service';
import { SeoService } from '../../core/services/seo.service';

interface Counter {
  label: string;
  suffix: string;
  target: number;
  value: WritableSignal<number>;
}

@Component({
  selector: 'app-hero',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('heroEnter', [
      transition(':enter', [
        query(
          '.hero__animate',
          [
            style({ opacity: 0, transform: 'translateY(36px)' }),
            stagger(120, [
              animate(
                '600ms cubic-bezier(0.16, 1, 0.3, 1)',
                style({ opacity: 1, transform: 'translateY(0)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
  template: `
    <section
      id="hero"
      class="hero"
      aria-labelledby="hero-heading"
      @heroEnter
    >
      <!-- Background -->
      <div class="hero__bg" aria-hidden="true">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80&auto=format&fit=crop"
          alt=""
          class="hero__bg-img"
          loading="eager"
          fetchpriority="high"
        />
        <div class="hero__bg-overlay"></div>
        <div class="hero__bg-gradient"></div>
      </div>

      <!-- Content -->
      <div class="hero__content">
        <div class="hero__animate hero__eyebrow">
          <span class="pill pill--primary">Nashik's #1 Gym</span>
        </div>

        <h1 id="hero-heading" class="hero__title hero__animate">
          FORGE YOUR<br /><span class="hero__title-accent">LIMITS</span>
        </h1>

        <p class="hero__subtitle hero__animate">
          Nashik's most intense gym experience.<br />
          <strong>Strength. Speed. Results.</strong>
        </p>

        <div class="hero__actions hero__animate">
          <button
            class="btn btn--primary btn--lg"
            (click)="scrollTo('contact')"
          >
            Start Free Trial
          </button>
          <button
            class="btn btn--secondary btn--lg"
            (click)="scrollTo('membership')"
          >
            Explore Plans
          </button>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="hero__scroll-hint" aria-hidden="true">
        <span></span>
      </div>

      <!-- Counter bar -->
      <div class="hero__counters" role="list" aria-label="Key statistics">
        @for (counter of counters; track counter.label) {
          <div class="hero__counter" role="listitem">
            <span class="hero__counter-value">
              {{ counter.value() }}<span class="hero__counter-suffix">{{ counter.suffix }}</span>
            </span>
            <span class="hero__counter-label">{{ counter.label }}</span>
          </div>
        }
      </div>
    </section>
  `,
  styleUrl: './hero.component.scss',
})
export class HeroComponent implements OnInit, OnDestroy {
  private scrollService = inject(ScrollService);
  private seoService = inject(SeoService);
  private platformId = inject(PLATFORM_ID);

  private rafId: number | null = null;

  readonly counters: Counter[] = [
    { label: 'Members', suffix: '+', target: 500, value: signal(0) },
    { label: 'Expert Trainers', suffix: '+', target: 10, value: signal(0) },
    { label: 'Years of Excellence', suffix: '+', target: 5, value: signal(0) },
  ];

  ngOnInit(): void {
    this.seoService.updateMeta({
      title: "Nashik's Premier Gym",
      description:
        "Unstoppable Fitness – Forge your limits at Nashik's most intense gym. 500+ members, expert trainers, and premium equipment. Start your free trial today.",
      keywords: 'gym Nashik, fitness center, CrossFit, weight training, personal trainer',
    });

    if (isPlatformBrowser(this.platformId)) {
      this.counters.forEach((c) =>
        this.animateCounter(c.value, c.target, 2200)
      );
    }
  }

  ngOnDestroy(): void {
    if (this.rafId !== null) cancelAnimationFrame(this.rafId);
  }

  scrollTo(section: string): void {
    this.scrollService.scrollToSection(section);
  }

  private animateCounter(
    sig: WritableSignal<number>,
    target: number,
    duration: number
  ): void {
    const startTime = performance.now();
    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      sig.set(Math.floor(eased * target));
      if (progress < 1) {
        this.rafId = requestAnimationFrame(step);
      }
    };
    this.rafId = requestAnimationFrame(step);
  }
}
