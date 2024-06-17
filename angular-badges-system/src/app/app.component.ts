import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterOutlet } from '@angular/router';
import { AchivementsPageComponent } from '../components/achievements-page.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `<main class="main">
      <app-achievements-page></app-achievements-page>
    </main>
    <router-outlet /> `,
  imports: [RouterOutlet, CommonModule, AchivementsPageComponent],
})
export class AppComponent {
  title = 'angular-badges-system';
}
