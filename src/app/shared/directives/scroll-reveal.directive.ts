import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  OnDestroy,
  inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appScrollReveal]',
  standalone: true,
})
export class ScrollRevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef);
  private platformId = inject(PLATFORM_ID);

  @Input() revealDelay = 0;
  @Input() revealDirection: 'up' | 'left' | 'right' = 'up';

  private observer: IntersectionObserver | null = null;

  ngOnInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const el = this.el.nativeElement as HTMLElement;
    el.classList.add('reveal-target');
    el.dataset['revealDirection'] = this.revealDirection;
    el.style.transitionDelay = `${this.revealDelay}ms`;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    this.observer.observe(el);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
