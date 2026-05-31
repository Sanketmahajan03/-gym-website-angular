import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ScrollService } from '../../core/services/scroll.service';

interface Program {
  id: string;
  icon: string;
  title: string;
  description: string;
  tag: string;
}

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [SectionTitleComponent, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="programs" class="programs" aria-labelledby="programs-heading">
      <div class="container">
        <app-section-title
          eyebrow="What We Offer"
          title='Train Hard. <span>Train Smart.</span>'
          subtitle="Choose from a wide range of programs designed by expert coaches to match every fitness goal."
        />

        <div class="programs__grid" role="list">
          @for (program of programs(); track program.id; let i = $index) {
            <article
              class="program-card"
              appScrollReveal
              [revealDelay]="(i % 3) * 100"
              revealDirection="up"
              role="listitem"
            >
              <div class="program-card__icon" aria-hidden="true" [innerHTML]="program.icon"></div>
              <span class="program-card__tag pill pill--primary">{{ program.tag }}</span>
              <h3 class="program-card__title">{{ program.title }}</h3>
              <p class="program-card__desc">{{ program.description }}</p>
              <button
                class="program-card__cta"
                (click)="joinProgram()"
                [attr.aria-label]="'Enquire about ' + program.title"
              >
                Get Started
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './programs.component.scss',
})
export class ProgramsComponent {
  private scrollService = inject(ScrollService);

  readonly programs = signal<Program[]>([
    {
      id: 'weight-training',
      icon: `<svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="20" width="8" height="8" rx="2" fill="currentColor" opacity=".3"/><rect x="36" y="20" width="8" height="8" rx="2" fill="currentColor" opacity=".3"/><rect x="12" y="16" width="6" height="16" rx="2" fill="currentColor" opacity=".6"/><rect x="30" y="16" width="6" height="16" rx="2" fill="currentColor" opacity=".6"/><rect x="18" y="22" width="12" height="4" rx="2" fill="currentColor"/></svg>`,
      title: 'Weight Training',
      description: 'Build raw strength and muscle mass with structured progressive overload programs under expert guidance.',
      tag: 'Strength',
    },
    {
      id: 'cardio-hiit',
      icon: `<svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M24 8c-8.8 0-16 7.2-16 16s7.2 16 16 16 16-7.2 16-16S32.8 8 24 8z" stroke="currentColor" stroke-width="2" opacity=".3"/><path d="M24 14v10l6 4" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M8 24h4M36 24h4M24 8v4M24 36v4" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".5"/></svg>`,
      title: 'Cardio & HIIT',
      description: 'Torch calories and supercharge your endurance with high-intensity interval training and cardio circuits.',
      tag: 'Fat Burn',
    },
    {
      id: 'crossfit',
      icon: `<svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 36L24 12l12 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 28h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".6"/><circle cx="24" cy="12" r="3" fill="currentColor" opacity=".4"/></svg>`,
      title: 'CrossFit',
      description: 'Full-body functional fitness that combines Olympic lifting, gymnastics, and metabolic conditioning.',
      tag: 'Functional',
    },
    {
      id: 'zumba',
      icon: `<svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="12" r="5" stroke="currentColor" stroke-width="2" opacity=".6"/><path d="M16 20c0 0 2 4 8 4s8-4 8-4l2 14-6-4-2 10-2-10-6 4 2-14z" stroke="currentColor" stroke-width="2" stroke-linejoin="round" fill="currentColor" opacity=".2"/></svg>`,
      title: 'Zumba & Dance',
      description: 'Fun, high-energy dance workouts set to infectious rhythms. Burn fat while having the time of your life.',
      tag: 'Dance',
    },
    {
      id: 'yoga',
      icon: `<svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="24" cy="10" r="4" stroke="currentColor" stroke-width="2" opacity=".6"/><path d="M24 14v8M24 22l-10 8M24 22l10 8M14 30l-2 8M34 30l2 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>`,
      title: 'Yoga & Flexibility',
      description: 'Recover faster, reduce injury risk, and build mindfulness through targeted yoga and flexibility sessions.',
      tag: 'Wellness',
    },
    {
      id: 'personal-training',
      icon: `<svg viewBox="0 0 48 48" width="40" height="40" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="12" r="5" stroke="currentColor" stroke-width="2"/><path d="M8 40v-6a10 10 0 0120 0v6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M32 14l8 8M40 14l-8 8" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" opacity=".7"/></svg>`,
      title: 'Personal Training',
      description: '1-on-1 coaching fully tailored to your body, goals, and schedule. The fastest path to lasting results.',
      tag: '1-on-1',
    },
  ]);

  joinProgram(): void {
    this.scrollService.scrollToSection('contact');
  }
}
