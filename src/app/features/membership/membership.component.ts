import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { Plan } from '../../core/models/plan.model';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-membership',
  standalone: true,
  imports: [SectionTitleComponent, ScrollRevealDirective, DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="membership" class="membership" aria-labelledby="membership-heading">
      <div class="container">
        <app-section-title
          eyebrow="Membership"
          title='Pick Your <span>Power Plan</span>'
          subtitle="No hidden fees. Cancel anytime. Choose a plan that fits your training intensity."
        />

        <div class="membership__grid" role="list">
          @for (plan of plans(); track plan.id; let i = $index) {
            <article
              class="plan-card"
              [class.plan-card--popular]="plan.popular"
              appScrollReveal
              [revealDelay]="i * 120"
              revealDirection="up"
              role="listitem"
              [attr.aria-label]="plan.name + ' plan' + (plan.popular ? ', most popular' : '')"
            >
              @if (plan.popular) {
                <div class="plan-card__badge" aria-hidden="true">⭐ Most Popular</div>
              }

              <div class="plan-card__header">
                <h3 class="plan-card__name">{{ plan.name }}</h3>
                <p class="plan-card__tagline">{{ plan.tagline }}</p>
              </div>

              <div class="plan-card__price" [attr.aria-label]="'Price: ₹' + plan.price + ' per ' + plan.period">
                <span class="plan-card__currency">₹</span>
                <span class="plan-card__amount">{{ plan.price | number }}</span>
                <span class="plan-card__period">/{{ plan.period }}</span>
              </div>

              <ul class="plan-card__features" aria-label="Plan features">
                @for (feature of plan.features; track feature) {
                  <li class="plan-card__feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" fill="rgba(255,85,0,0.12)"/>
                      <path d="M9 12l2 2 4-4" stroke="#FF5500" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    {{ feature }}
                  </li>
                }
              </ul>

              <button
                class="plan-card__cta btn"
                [class.btn--primary]="plan.popular"
                [class.btn--outline]="!plan.popular"
                (click)="joinPlan(plan)"
                [attr.aria-label]="'Join the ' + plan.name + ' plan'"
              >
                Join Now
              </button>
            </article>
          }
        </div>
      </div>
    </section>
  `,
  styleUrl: './membership.component.scss',
})
export class MembershipComponent {
  private scrollService = inject(ScrollService);

  readonly plans = signal<Plan[]>([
    {
      id: 'starter',
      name: 'Starter',
      price: 999,
      period: 'mo',
      tagline: 'Perfect for beginners',
      features: [
        '3 days/week gym access',
        'Locker access included',
        'Basic equipment access',
        'Fitness assessment',
        'App access',
      ],
      popular: false,
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 1799,
      period: 'mo',
      tagline: 'Best value for serious athletes',
      features: [
        'Unlimited days access',
        'All equipment & machines',
        '1 PT session / month',
        'All group classes',
        'Locker + towel service',
        'Nutrition guidance',
      ],
      popular: true,
    },
    {
      id: 'elite',
      name: 'Elite',
      price: 2999,
      period: 'mo',
      tagline: 'The complete transformation package',
      features: [
        'Unlimited days access',
        'All equipment & all classes',
        'Dedicated personal trainer',
        'Customised diet plan',
        'Priority class booking',
        'Sauna & recovery access',
        'Monthly body composition',
      ],
      popular: false,
    },
  ]);

  joinPlan(plan: Plan): void {
    this.scrollService.scrollToSection('contact');
  }
}
