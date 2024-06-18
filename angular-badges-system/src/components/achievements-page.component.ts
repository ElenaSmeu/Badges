import { Component, OnDestroy, OnInit } from '@angular/core';
import { AchivementsService } from '../services/achievements.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AchievementComponent } from './achievement.component';
import { Achievement } from '../utils/Achievement';
import { OrderAchievementsPipe } from '../utils/order-achievements.pipe';
import { SearchPipe } from '../utils/search.pipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-achievements-page',
  standalone: true,
  template: `
    <div class="flex flex-row justify-between mt-4 items-center">
      <div class="px-4 text-xl">Welcome back!</div>
      <div class="flex flex-1 flex-col mr-4">
        <input
          class="border border-gray-100 hover:border-gray-400 rounded px-4 py-2"
          [(ngModel)]="searchTerm"
          placeholder="Search"
        />
      </div>
    </div>
    <div class="grid grid-cols-4 gap-4 p-4">
      <div
        *ngFor="
          let achievement of achievements
            | orderAchievements
            | searchAchievements : searchTerm
        "
      >
        <app-achievement [achievement]="achievement"></app-achievement>
      </div>
    </div>
  `,
  imports: [
    CommonModule,
    AchievementComponent,
    OrderAchievementsPipe,
    SearchPipe,
    FormsModule,
  ],
})
export class AchivementsPageComponent implements OnInit, OnDestroy {
  achievements: Achievement[] = [];
  subscriptions: Subscription[] = [];
  searchTerm: string = '';

  constructor(private achievementService: AchivementsService) {}

  ngOnInit(): void {
    const sub = this.achievementService.getAchivements().subscribe((data) => {
      this.achievements = data;
    });
    this.subscriptions.push(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
