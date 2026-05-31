import {
  Component,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-section-title',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="section-header" [class.section-header--left]="align === 'left'">
      @if (eyebrow) {
        <span class="section-header__eyebrow">{{ eyebrow }}</span>
      }
      <h2 class="section-header__title" [innerHTML]="title"></h2>
      @if (subtitle) {
        <p class="section-header__subtitle">{{ subtitle }}</p>
      }
    </div>
  `,
  styleUrl: './section-title.component.scss',
})
export class SectionTitleComponent {
  @Input() eyebrow = '';
  @Input({ required: true }) title = '';
  @Input() subtitle = '';
  @Input() align: 'center' | 'left' = 'center';
}
