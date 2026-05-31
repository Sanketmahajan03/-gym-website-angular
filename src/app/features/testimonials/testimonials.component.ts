import {
  Component,
  ChangeDetectionStrategy,
  signal,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
  computed,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
} from '@angular/animations';
import { Testimonial } from '../../core/models/testimonial.model';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [SectionTitleComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('slide', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(40px)' }),
        animate('350ms ease', style({ opacity: 1, transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('250ms ease', style({ opacity: 0, transform: 'translateX(-40px)' })),
      ]),
    ]),
  ],
  template: `
    <section id="testimonials" class="testimonials" aria-labelledby="testimonials-heading">
      <div class="container">
        <app-section-title
          eyebrow="Success Stories"
          title='Real People. <span>Real Results.</span>'
          subtitle="Don't take our word for it. Hear from our community of champions."
        />

        <div
          class="testimonials__carousel"
          role="region"
          aria-label="Testimonials carousel"
          aria-live="polite"
        >
          <div class="testimonials__track">
            @if (currentTestimonial(); as t) {
              <div class="testimonial-card" @slide>
                <div class="testimonial-card__top">
                  <div class="testimonial-card__avatar" aria-hidden="true">{{ t.initials }}</div>
                  <div>
                    <p class="testimonial-card__name">{{ t.name }}</p>
                    <div class="testimonial-card__stars" [attr.aria-label]="t.rating + ' out of 5 stars'">
                      @for (star of starsArray(t.rating); track $index) {
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FFB800" aria-hidden="true">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      }
                    </div>
                  </div>
                  <span class="testimonial-card__result pill pill--highlight">{{ t.result }}</span>
                </div>
                <blockquote class="testimonial-card__quote">
                  "{{ t.quote }}"
                </blockquote>
              </div>
            }
          </div>

          <!-- Dot navigation -->
          <div class="testimonials__dots" role="tablist" aria-label="Testimonial navigation">
            @for (t of testimonials(); track t.id; let i = $index) {
              <button
                class="testimonials__dot"
                [class.testimonials__dot--active]="currentIndex() === i"
                (click)="goTo(i)"
                role="tab"
                [attr.aria-selected]="currentIndex() === i"
                [attr.aria-label]="'Go to testimonial ' + (i + 1)"
              ></button>
            }
          </div>

          <!-- Controls -->
          <div class="testimonials__controls">
            <button
              class="testimonials__ctrl"
              (click)="prev()"
              aria-label="Previous testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M15 18l-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <button
              class="testimonials__ctrl"
              (click)="next()"
              aria-label="Next testimonial"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M9 18l6-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './testimonials.component.scss',
})
export class TestimonialsComponent implements OnInit, OnDestroy {
  private platformId = inject(PLATFORM_ID);
  private intervalId: ReturnType<typeof setInterval> | null = null;

  readonly currentIndex = signal(0);

  readonly testimonials = signal<Testimonial[]>([
    {
      id: 't1',
      name: 'Rahul M.',
      quote: 'Unstoppable Fitness changed my life completely. Lost 12kg in 3 months and feel incredible!',
      result: '-12 kg',
      rating: 5,
      initials: 'RM',
    },
    {
      id: 't2',
      name: 'Kavita D.',
      quote: 'Best gym in Nashik, hands down. The trainers are motivating, equipment is world-class.',
      result: 'Strength ↑',
      rating: 5,
      initials: 'KD',
    },
    {
      id: 't3',
      name: 'Aditya S.',
      quote: 'The trainers here are truly world-class. I completed my first marathon after joining Unstoppable.',
      result: 'First Marathon',
      rating: 5,
      initials: 'AS',
    },
    {
      id: 't4',
      name: 'Meena T.',
      quote: 'Supportive, motivating, and genuinely results-driven. Perfect for post-pregnancy fitness journey.',
      result: '-8 kg',
      rating: 5,
      initials: 'MT',
    },
    {
      id: 't5',
      name: 'Suresh P.',
      quote: 'Affordable plans with premium equipment and top-tier coaching. Best investment I ever made.',
      result: '+8 kg Muscle',
      rating: 5,
      initials: 'SP',
    },
  ]);

  readonly currentTestimonial = computed(
    () => this.testimonials()[this.currentIndex()]
  );

  starsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startAutoplay();
    }
  }

  ngOnDestroy(): void {
    this.stopAutoplay();
  }

  private startAutoplay(): void {
    this.intervalId = setInterval(() => {
      this.next();
    }, 4500);
  }

  private stopAutoplay(): void {
    if (this.intervalId !== null) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  goTo(index: number): void {
    this.stopAutoplay();
    this.currentIndex.set(index);
    this.startAutoplay();
  }

  next(): void {
    this.currentIndex.update(
      (i) => (i + 1) % this.testimonials().length
    );
  }

  prev(): void {
    this.currentIndex.update(
      (i) => (i === 0 ? this.testimonials().length - 1 : i - 1)
    );
  }
}
