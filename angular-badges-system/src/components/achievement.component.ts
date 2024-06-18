import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Achievement } from '../utils/Achievement';

@Component({
  selector: 'app-achievement',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      *ngIf="achievement; else noAchivement"
      class="flex flex-col items-center p-2 border border-gray-200 rounded-md"
    >
      <p
        class="text-lg"
        [ngClass]="{
          'text-green-600': achievement.level == 'easy',
          'text-blue-600': achievement.level == 'medium',
          'text-red-700': achievement.level == 'hard'
        }"
      >
        {{ achievement.level | uppercase }}
      </p>
      <p>{{ achievement.timesUnlocked }}</p>
      <img
        [ngClass]="{ 'blur-sm grayscale': achievement.timesUnlocked == 0 }"
        [src]="'assets/images/' + achievement.image"
        alt="{{ achievement.name }}"
      />
      <p class="text-center text-xs text-gray-700">
        {{ achievement.description }}
      </p>
    </div>
    <ng-template #noAchivement>
      <div class="text-lg text-gray-200">Not found.</div>
    </ng-template>
  `,
})
export class AchievementComponent {
  @Input() achievement: Achievement | null = null;
}
