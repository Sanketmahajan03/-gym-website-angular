import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { WhatsappFabComponent } from './shared/components/whatsapp-fab/whatsapp-fab.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, WhatsappFabComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-header />
    <main id="main-content" tabindex="-1">
      <router-outlet />
    </main>
    <app-footer />
    <app-whatsapp-fab />
  `,
  styles: [
    `
      main {
        outline: none;
      }
    `,
  ],
})
export class AppComponent {}
