import { Injectable, signal, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class ScrollService {
  private doc = inject(DOCUMENT);
  readonly activeSection = signal<string>('hero');

  scrollToSection(sectionId: string): void {
    const el = this.doc.getElementById(sectionId);
    if (el) {
      const headerOffset = 72;
      const top = el.getBoundingClientRect().top + window.scrollY - headerOffset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }

  setActiveSection(sectionId: string): void {
    this.activeSection.set(sectionId);
  }

  updateActiveSectionFromScroll(sectionIds: string[]): void {
    const scrollMid = window.scrollY + window.innerHeight * 0.4;
    for (let i = sectionIds.length - 1; i >= 0; i--) {
      const el = this.doc.getElementById(sectionIds[i]);
      if (el && el.offsetTop <= scrollMid) {
        this.activeSection.set(sectionIds[i]);
        break;
      }
    }
  }
}
