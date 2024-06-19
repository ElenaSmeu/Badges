import { Component, OnDestroy, OnInit } from '@angular/core';
import { AchivementsService } from '../services/achievements.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { AchievementComponent } from './achievement.component';
import { Achievement } from '../utils/Achievement';
import { OrderAchievementsPipe } from '../utils/order-achievements.pipe';
import { SearchPipe } from '../utils/search.pipe';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-achievements-page',
  standalone: true,
  template: `
    <div class="flex flex-row justify-between mt-4 items-center">
      <div class="px-4 text-xl">Welcome!</div>
      <div class="flex flex-1 flex-col mr-4">
        <input
          class="border border-gray-100 hover:border-gray-400 rounded px-4 py-2"
          [(ngModel)]="searchTerm"
          placeholder="Search"
        />
      </div>
    </div>

    <div *ngIf="lastUnlockedAchievement && searchTerm == ''" class=" p-4 ">
      <app-achievement
        [achievement]="lastUnlockedAchievement"
        [isAnimated]="true"
      ></app-achievement>
    </div>
    <div class="flex flex-row items-center text-xs px-4 pt-2 text-gray-400">
      <fa-icon [icon]="infoIcon"></fa-icon>
      <p class="ml-2">
        Double-click or long-press on an achievement to unlock it.
      </p>
    </div>

    <div class="grid md:grid-cols-4 lg:grid-cols-6 gap-4 p-4">
      <div
        *ngFor="
          let achievement of achievements
            | orderAchievements
            | searchAchievements : searchTerm
        "
      >
        <app-achievement
          [achievement]="achievement"
          [isAnimated]="false"
          (unlockAchievement)="unlockAchievement($event)"
        ></app-achievement>
      </div>
    </div>
  `,
  imports: [
    CommonModule,
    AchievementComponent,
    OrderAchievementsPipe,
    SearchPipe,
    FormsModule,
    FontAwesomeModule,
  ],
})
export class AchivementsPageComponent implements OnInit, OnDestroy {
  achievements: Achievement[] = [];
  subscriptions: Subscription[] = [];
  searchTerm: string = '';
  lastUnlockedAchievement: Achievement | null = null;
  infoIcon = faInfoCircle;

  constructor(private achievementService: AchivementsService) {}

  ngOnInit(): void {
    const sub = this.achievementService.getAchievements().subscribe((data) => {
      this.achievements = data;
      this.updateGetLastUnlocked();
    });
    this.subscriptions.push(sub);
  }
  private updateGetLastUnlocked() {
    const unlockedAchievements = this.achievements
      .filter((a) => a.lastUnlocked)
      .sort(
        (a, b) =>
          new Date(b.lastUnlocked!).getTime() -
          new Date(a.lastUnlocked!).getTime()
      );

    this.lastUnlockedAchievement =
      unlockedAchievements.length > 0 ? unlockedAchievements[0] : null;
  }

  unlockAchievement(achievement: Achievement) {
    const updatedAchievement = {
      ...achievement,
      timesUnlocked: achievement.timesUnlocked + 1,
      lastUnlocked: new Date().toUTCString(),
    };
    this.achievementService.updateAchievement(updatedAchievement);
    this.updateGetLastUnlocked();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
