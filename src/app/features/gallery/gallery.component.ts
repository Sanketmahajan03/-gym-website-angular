import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
  HostListener,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { A11yModule } from '@angular/cdk/a11y';
import { SectionTitleComponent } from '../../shared/components/section-title/section-title.component';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

interface GalleryImage {
  id: string;
  url: string;
  thumb: string;
  alt: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [SectionTitleComponent, ScrollRevealDirective, A11yModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="gallery" class="gallery" aria-labelledby="gallery-heading">
      <div class="container">
        <app-section-title
          eyebrow="Our Space"
          title='Inside <span>Unstoppable Fitness</span>'
          subtitle="State-of-the-art equipment, spacious training zones, and an electric atmosphere."
        />

        <div class="gallery__grid" role="list" aria-label="Gym photo gallery">
          @for (image of images(); track image.id; let i = $index) {
            <button
              class="gallery__item"
              [class.gallery__item--tall]="i === 0 || i === 4"
              (click)="openLightbox(i)"
              [attr.aria-label]="'View photo: ' + image.alt"
              role="listitem"
              appScrollReveal
              [revealDelay]="(i % 3) * 80"
            >
              <img
                [src]="image.thumb"
                [alt]="image.alt"
                class="gallery__img"
                loading="lazy"
              />
              <div class="gallery__item-overlay" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="white" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </div>
            </button>
          }
        </div>
      </div>
    </section>

    <!-- Lightbox -->
    @if (isLightboxOpen()) {
      <div
        class="lightbox"
        cdkTrapFocus
        [cdkTrapFocusAutoCapture]="true"
        role="dialog"
        aria-modal="true"
        [attr.aria-label]="'Photo: ' + currentImage()?.alt"
      >
        <div class="lightbox__backdrop" (click)="closeLightbox()"></div>

        <div class="lightbox__content">
          <img
            [src]="currentImage()?.url"
            [alt]="currentImage()?.alt ?? ''"
            class="lightbox__img"
          />

          <!-- Controls -->
          <button
            class="lightbox__btn lightbox__btn--prev"
            (click)="prevImage()"
            aria-label="Previous image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18l-6-6 6-6" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <button
            class="lightbox__btn lightbox__btn--next"
            (click)="nextImage()"
            aria-label="Next image"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18l6-6-6-6" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <button
            class="lightbox__close"
            (click)="closeLightbox()"
            aria-label="Close lightbox"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="white" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </button>

          <div class="lightbox__caption">
            {{ currentImage()?.alt }} — {{ selectedIndex() + 1 }} / {{ images().length }}
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  private platformId = inject(PLATFORM_ID);

  readonly selectedIndex = signal(-1);
  readonly isLightboxOpen = computed(() => this.selectedIndex() >= 0);
  readonly currentImage = computed(() => {
    const idx = this.selectedIndex();
    return idx >= 0 ? this.images()[idx] : null;
  });

  readonly images = signal<GalleryImage[]>([
    {
      id: 'g1',
      url: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80&auto=format',
      thumb: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=75&auto=format',
      alt: 'Main gym floor with squat racks',
    },
    {
      id: 'g2',
      url: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200&q=80&auto=format',
      thumb: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&q=75&auto=format',
      alt: 'Cardio machines section',
    },
    {
      id: 'g3',
      url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=1200&q=80&auto=format',
      thumb: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&q=75&auto=format',
      alt: 'Weight training area',
    },
    {
      id: 'g4',
      url: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=1200&q=80&auto=format',
      thumb: 'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=600&q=75&auto=format',
      alt: 'CrossFit training zone',
    },
    {
      id: 'g5',
      url: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=1200&q=80&auto=format',
      thumb: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?w=600&q=75&auto=format',
      alt: 'Personal training session',
    },
    {
      id: 'g6',
      url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=1200&q=80&auto=format',
      thumb: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=600&q=75&auto=format',
      alt: 'Free weights and dumbbells',
    },
    {
      id: 'g7',
      url: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=1200&q=80&auto=format',
      thumb: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=600&q=75&auto=format',
      alt: 'Group fitness class in session',
    },
    {
      id: 'g8',
      url: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=1200&q=80&auto=format',
      thumb: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=600&q=75&auto=format',
      alt: 'Yoga and flexibility studio',
    },
  ]);

  openLightbox(index: number): void {
    this.selectedIndex.set(index);
  }

  closeLightbox(): void {
    this.selectedIndex.set(-1);
  }

  nextImage(): void {
    this.selectedIndex.update((i) => (i + 1) % this.images().length);
  }

  prevImage(): void {
    this.selectedIndex.update((i) =>
      i === 0 ? this.images().length - 1 : i - 1
    );
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (!this.isLightboxOpen()) return;
    if (event.key === 'Escape') this.closeLightbox();
    if (event.key === 'ArrowRight') this.nextImage();
    if (event.key === 'ArrowLeft') this.prevImage();
  }
}
