import { Component, Input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Achievement } from '../utils/Achievement';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-achievement',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div
      *ngIf="achievement; else noAchivement"
      class="flex flex-col items-center p-2 border border-gray-200 rounded-md cursor-pointer"
      (dblclick)="onDoubleClick()"
      (click)="onSingleClick()"
    >
      <p
        class="text-lg"
        [class.text-green-600]="achievement.level == 'easy'"
        [class.text-blue-600]="achievement.level == 'medium'"
        [class.text-red-600]="achievement.level == 'hard'"
      >
        {{ achievement.level | uppercase }}
      </p>

      <img
        [ngClass]="{
          'blur-sm grayscale': achievement.timesUnlocked == 0,
          'animate-bounce': isAnimated
        }"
        [src]="'assets/images/' + achievement.image"
        alt="{{ achievement.name }}"
      />
      <div class="relative self-start">
        @for (item of generateTimesunlockedArray(achievement.timesUnlocked);
        track $index) {
        <div
          [ngStyle]="{
            left: $index * 20 + 'px',
            opacity: getStarOpacity($index)
          }"
          class="absolute bottom-0"
        >
          <div class="relative text-4xl text-yellow-500">
            <fa-icon [icon]="faStar"></fa-icon>
          </div>
        </div>
        }
      </div>
      <p class="text-center text-xs text-gray-700">
        {{ achievement.description }}
      </p>
    </div>
    <ng-template #noAchivement>
      <div class="text-lg text-gray-200">Not found.</div>
    </ng-template>
    <ng-template #timesUnlocked> </ng-template>
  `,
})
export class AchievementComponent {
  @Input() achievement: Achievement | null = null;
  @Input() isAnimated: boolean = false;
  faStar = faStar;
  unlockAchievement = output<Achievement>();

  private singleClickTimeout: any; /// this should be it: NodeJS.Timeout | undefined;

  generateTimesunlockedArray(num: number) {
    return Array.from({ length: num }).map((_, i) => i + 1);
  }
  getStarOpacity(index: number): number {
    const total = this.achievement?.timesUnlocked || 1;
    return 1 - index / total;
  }
  onDoubleClick() {
    clearTimeout(this.singleClickTimeout);
    this.achievement ? this.unlockAchievement.emit(this.achievement) : {};
  }
  onSingleClick() {
    clearTimeout(this.singleClickTimeout);
    this.singleClickTimeout = setTimeout(() => {
      if (this.achievement) {
        this.unlockAchievement.emit(this.achievement);
      }
    }, 300);
  }
}
