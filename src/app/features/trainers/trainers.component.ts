import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { Trainer } from '../../core/models/trainer.model';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-trainers',
  standalone: true,
  imports: [SectionTitleComponent, ScrollRevealDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="trainers" class="trainers" aria-labelledby="trainers-heading">
      <div class="container">
        <app-section-title
          eyebrow="Our Team"
          title='Meet Your <span>Coaches</span>'
          subtitle="World-class trainers who are as invested in your results as you are."
        />

        <div class="trainers__grid" role="list">
          @for (trainer of trainers(); track trainer.id; let i = $index) {
            <article
              class="trainer-card"
              appScrollReveal
              [revealDelay]="i * 100"
              revealDirection="up"
              role="listitem"
            >
              <div
                class="trainer-card__avatar"
                [style.background]="trainer.avatarColor"
                [attr.aria-hidden]="true"
              >
                {{ trainer.initials }}
              </div>

              <div class="trainer-card__body">
                <h3 class="trainer-card__name">{{ trainer.name }}</h3>
                <p class="trainer-card__title">{{ trainer.title }}</p>
                <p class="trainer-card__exp">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="1.8"/>
                  </svg>
                  {{ trainer.experience }} years experience
                </p>

                <div class="trainer-card__specs" role="list" aria-label="Specializations">
                  @for (spec of trainer.specializations; track spec) {
                    <span class="pill pill--primary" role="listitem">{{ spec }}</span>
                  }
                </div>

                <a
                  [href]="'https://instagram.com/' + trainer.instagramHandle"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="trainer-card__ig"
                  [attr.aria-label]="'Follow ' + trainer.name + ' on Instagram'"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" stroke-width="1.8"/>
                    <circle cx="12" cy="12" r="4.5" stroke="currentColor" stroke-width="1.8"/>
                    <circle cx="17.5" cy="6.5" r="1.1" fill="currentColor"/>
                  </svg>
                  {{ '@' + trainer.instagramHandle }}
                </a>
              </div>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './trainers.component.scss',
})
export class TrainersComponent {
  readonly trainers = signal<Trainer[]>([
    {
      id: 'arjun',
      name: 'Arjun Jadhav',
      title: 'Head Coach',
      experience: 8,
      specializations: ['Strength & Conditioning', 'Olympic Lifting'],
      initials: 'AJ',
      avatarColor: '#FF5500',
      instagramHandle: 'arjun.jadhav.fit',
    },
    {
      id: 'priya',
      name: 'Priya Sharma',
      title: 'Cardio & Zumba Expert',
      experience: 5,
      specializations: ['Zumba', 'Dance Fitness', 'HIIT'],
      initials: 'PS',
      avatarColor: '#CC3D00',
      instagramHandle: 'priya.fitness.nashik',
    },
    {
      id: 'rohit',
      name: 'Rohit Kulkarni',
      title: 'CrossFit & Functional Trainer',
      experience: 6,
      specializations: ['CrossFit', 'Functional Training', 'Calisthenics'],
      initials: 'RK',
      avatarColor: '#FFB800',
      instagramHandle: 'rohit.cf.nashik',
    },
    {
      id: 'sneha',
      name: 'Sneha Patil',
      title: 'Yoga & Wellness Coach',
      experience: 4,
      specializations: ['Hatha Yoga', 'Pilates', 'Meditation'],
      initials: 'SP',
      avatarColor: '#6C63FF',
      instagramHandle: 'sneha.yoga.nashik',
    },
  ]);
}
