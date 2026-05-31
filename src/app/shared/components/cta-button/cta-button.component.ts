import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';

@Component({
  selector: 'app-cta-button',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      class="cta-btn"
      [class.cta-btn--primary]="variant === 'primary'"
      [class.cta-btn--secondary]="variant === 'secondary'"
      [class.cta-btn--outline]="variant === 'outline'"
      [class.cta-btn--lg]="size === 'lg'"
      [class.cta-btn--sm]="size === 'sm'"
      [disabled]="disabled || loading"
      [attr.aria-label]="ariaLabel || null"
      (click)="clicked.emit($event)"
      type="button"
    >
      @if (loading) {
        <span class="spinner" aria-hidden="true"></span>
      }
      <ng-content />
    </button>
  `,
  styleUrl: './cta-button.component.scss',
})
export class CtaButtonComponent {
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled = false;
  @Input() loading = false;
  @Input() ariaLabel = '';
  @Output() clicked = new EventEmitter<MouseEvent>();
}
