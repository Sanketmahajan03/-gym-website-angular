import {
  Component,
  ChangeDetectionStrategy,
  signal,
  inject,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
} from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { SeoService } from '../../core/services/seo.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [SectionTitleComponent, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact" class="contact" aria-labelledby="contact-heading">
      <div class="container">
        <app-section-title
          eyebrow="Get In Touch"
          title="Let's Talk <span>Fitness</span>"
          subtitle="Ready to start? Fill in the form and our team will reach out within 24 hours."
        />

        <div class="contact__grid">
          <!-- Form -->
          <div class="contact__form-wrap">
            @if (!isSuccess()) {
              <form
                class="contact__form"
                [formGroup]="contactForm"
                (ngSubmit)="onSubmit()"
                novalidate
                aria-label="Contact form"
              >
                <!-- Name -->
                <div class="form-group">
                  <label class="form-label" for="name">
                    Full Name <span aria-hidden="true" class="required">*</span>
                  </label>
                  <input
                    id="name"
                    class="form-control"
                    type="text"
                    formControlName="name"
                    placeholder="Rahul Sharma"
                    autocomplete="name"
                    [attr.aria-invalid]="isFieldInvalid('name')"
                    aria-describedby="name-error"
                  />
                  @if (isFieldInvalid('name')) {
                    <span id="name-error" class="form-error" role="alert">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                      Name is required
                    </span>
                  }
                </div>

                <!-- Email -->
                <div class="form-group">
                  <label class="form-label" for="email">
                    Email Address <span aria-hidden="true" class="required">*</span>
                  </label>
                  <input
                    id="email"
                    class="form-control"
                    type="email"
                    formControlName="email"
                    placeholder="rahul@example.com"
                    autocomplete="email"
                    [attr.aria-invalid]="isFieldInvalid('email')"
                    aria-describedby="email-error"
                  />
                  @if (isFieldInvalid('email')) {
                    <span id="email-error" class="form-error" role="alert">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                      @if (contactForm.get('email')?.errors?.['required']) {
                        Email is required
                      } @else {
                        Please enter a valid email address
                      }
                    </span>
                  }
                </div>

                <!-- Phone -->
                <div class="form-group">
                  <label class="form-label" for="phone">
                    Phone Number <span class="optional">(optional)</span>
                  </label>
                  <input
                    id="phone"
                    class="form-control"
                    type="tel"
                    formControlName="phone"
                    placeholder="9876543210"
                    autocomplete="tel"
                    maxlength="10"
                    [attr.aria-invalid]="isFieldInvalid('phone')"
                    aria-describedby="phone-error"
                  />
                  @if (isFieldInvalid('phone')) {
                    <span id="phone-error" class="form-error" role="alert">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                      Please enter a valid 10-digit phone number
                    </span>
                  }
                </div>

                <!-- Message -->
                <div class="form-group">
                  <label class="form-label" for="message">
                    Message <span aria-hidden="true" class="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    class="form-control contact__textarea"
                    formControlName="message"
                    placeholder="Tell us about your fitness goals…"
                    rows="5"
                    [attr.aria-invalid]="isFieldInvalid('message')"
                    aria-describedby="message-error"
                  ></textarea>
                  @if (isFieldInvalid('message')) {
                    <span id="message-error" class="form-error" role="alert">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 8v4M12 16h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                      @if (contactForm.get('message')?.errors?.['required']) {
                        Message is required
                      } @else {
                        Message must be at least 20 characters
                      }
                    </span>
                  }
                </div>

                <button
                  type="submit"
                  class="btn btn--primary btn--lg contact__submit"
                  [disabled]="isSubmitting()"
                >
                  @if (isSubmitting()) {
                    <span class="spinner" aria-hidden="true"></span>
                    Sending…
                  } @else {
                    Send Message
                  }
                </button>
              </form>
            } @else {
              <div class="contact__success" role="alert" aria-live="assertive">
                <div class="contact__success-icon" aria-hidden="true">💪</div>
                <h3>We'll call you back soon!</h3>
                <p>Thanks for reaching out. Our team will contact you within 24 hours to get you started on your fitness journey.</p>
                <button class="btn btn--outline" (click)="resetForm()">
                  Send Another Message
                </button>
              </div>
            }
          </div>

          <!-- Info + Map -->
          <div class="contact__info">
            <div class="contact__details">
              <h3 class="contact__info-title">Find Us</h3>

              <div class="contact__detail-items">
                <div class="contact__detail">
                  <svg class="contact__detail-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" stroke="currentColor" stroke-width="1.8"/>
                    <circle cx="12" cy="9" r="2.5" stroke="currentColor" stroke-width="1.8"/>
                  </svg>
                  <div>
                    <p class="contact__detail-label">Address</p>
                    <p class="contact__detail-value">{{ address }}</p>
                  </div>
                </div>

                <div class="contact__detail">
                  <svg class="contact__detail-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82 19.79 19.79 0 012 1.2 2 2 0 014 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" stroke-width="1.8"/>
                  </svg>
                  <div>
                    <p class="contact__detail-label">Phone / WhatsApp</p>
                    <a class="contact__detail-value contact__detail-link" href="tel:+919876543210">
                      {{ phone }}
                    </a>
                  </div>
                </div>

                <div class="contact__detail">
                  <svg class="contact__detail-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 4h16a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2z" stroke="currentColor" stroke-width="1.8"/>
                    <path d="M22 6l-10 7L2 6" stroke="currentColor" stroke-width="1.8"/>
                  </svg>
                  <div>
                    <p class="contact__detail-label">Email</p>
                    <a class="contact__detail-value contact__detail-link" href="mailto:Unstoppablefitness.nashik@gmail.com">
                      {{ email }}
                    </a>
                  </div>
                </div>

                <div class="contact__detail">
                  <svg class="contact__detail-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.8"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                  </svg>
                  <div>
                    <p class="contact__detail-label">Hours</p>
                    <p class="contact__detail-value">Mon–Sat: 5:30 AM – 10:00 PM</p>
                    <p class="contact__detail-value">Sunday: 7:00 AM – 1:00 PM</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Map -->
            <div class="contact__map-wrap">
              <iframe
                class="contact__map"
                [src]="mapUrl"
                title="Unstoppable Fitness location map – Nashik, Maharashtra"
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                allowfullscreen
                aria-label="Google Maps showing gym location in Nashik"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './contact.component.scss',
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private seoService = inject(SeoService);

  private sanitizer = inject(DomSanitizer);

  readonly address = environment.address;
  readonly phone = environment.phone;
  readonly email = environment.email;
  readonly mapUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    environment.mapEmbedUrl
  );

  readonly isSubmitting = signal(false);
  readonly isSuccess = signal(false);

  readonly contactForm = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.pattern(/^\d{10}$/)]],
    message: ['', [Validators.required, Validators.minLength(20)]],
  });

  ngOnInit(): void {
    this.seoService.updateMeta({
      title: 'Contact Us',
      description:
        'Get in touch with Unstoppable Fitness in Nashik. Claim your free trial week or enquire about membership plans.',
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const control = this.contactForm.get(fieldName) as AbstractControl;
    return control.invalid && (control.dirty || control.touched);
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }
    this.isSubmitting.set(true);
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSuccess.set(true);
    }, 800);
  }

  resetForm(): void {
    this.contactForm.reset();
    this.isSuccess.set(false);
  }
}
