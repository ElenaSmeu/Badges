import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `<main class="main">
      <div>WELCOME</div>
    </main>
    <router-outlet /> `,
})
export class AppComponent {
  title = 'angular-badges-system';
}
