import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { ScrollService } from '../../core/services/scroll.service';

@Component({
  selector: 'app-trial-cta',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="trial-cta" class="trial-cta" aria-labelledby="trial-cta-heading">
      <div class="trial-cta__inner">
        <div class="trial-cta__content">
          <span class="trial-cta__eyebrow">Limited Time Offer</span>
          <h2 id="trial-cta-heading" class="trial-cta__headline">
            Your First Week is <span>FREE.</span><br />No Excuses.
          </h2>
          <p class="trial-cta__sub">
            Join 500+ Nashikites who started their transformation at Unstoppable Fitness.
            Zero commitment required — just show up.
          </p>
          <button
            class="trial-cta__btn"
            (click)="claimTrial()"
            aria-label="Claim your free trial week"
          >
            Claim Free Trial
          </button>
        </div>

        <div class="trial-cta__deco" aria-hidden="true">
          <span class="trial-cta__deco-text">FREE</span>
          <span class="trial-cta__deco-text">TRIAL</span>
        </div>
      </div>
    </section>
  `,
  styleUrl: './trial-cta.component.scss',
})
export class TrialCtaComponent {
  private scrollService = inject(ScrollService);

  claimTrial(): void {
    this.scrollService.scrollToSection('contact');
  }
}
