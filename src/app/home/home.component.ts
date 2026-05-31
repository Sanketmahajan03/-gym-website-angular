import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeroComponent } from '../features/hero/hero.component';
import { ProgramsComponent } from '../features/programs/programs.component';
import { MembershipComponent } from '../features/membership/membership.component';
import { TrainersComponent } from '../features/trainers/trainers.component';
import { GalleryComponent } from '../features/gallery/gallery.component';
import { TestimonialsComponent } from '../features/testimonials/testimonials.component';
import { TrialCtaComponent } from '../features/trial-cta/trial-cta.component';
import { ContactComponent } from '../features/contact/contact.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    ProgramsComponent,
    MembershipComponent,
    TrainersComponent,
    GalleryComponent,
    TestimonialsComponent,
    TrialCtaComponent,
    ContactComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Hero loads eagerly — above the fold -->
    <app-hero />

    <!-- All below-fold sections are deferred until they enter the viewport -->
    @defer (on viewport) {
      <app-programs />
    } @loading (minimum 300ms) {
      <div class="section-skeleton"></div>
    } @placeholder {
      <div class="section-skeleton"></div>
    }

    @defer (on viewport) {
      <app-membership />
    } @placeholder {
      <div class="section-skeleton"></div>
    }

    @defer (on viewport) {
      <app-trainers />
    } @placeholder {
      <div class="section-skeleton"></div>
    }

    @defer (on viewport) {
      <app-gallery />
    } @placeholder {
      <div class="section-skeleton"></div>
    }

    @defer (on viewport) {
      <app-testimonials />
    } @placeholder {
      <div class="section-skeleton"></div>
    }

    @defer (on viewport) {
      <app-trial-cta />
    } @placeholder {
      <div class="section-skeleton" style="min-height:280px"></div>
    }

    @defer (on viewport) {
      <app-contact />
    } @placeholder {
      <div class="section-skeleton"></div>
    }
  `,
})
export class HomeComponent {}
