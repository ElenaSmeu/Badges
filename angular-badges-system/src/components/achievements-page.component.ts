import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  Achievement,
  AchivementsService,
} from '../services/achievements.service';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-achievements-page',
  standalone: true,
  imports: [CommonModule],
  template: `<div *ngFor="let achievement of achievements">
    <h3>{{ achievement.name }}</h3>
    <img
      [src]="'assets/images/' + achievement.image"
      alt="{{ achievement.name }}"
    />
    <p>{{ achievement.description }}</p>
    <p>Level: {{ achievement.level }}</p>
    <p>Times Unlocked: {{ achievement.timesUnlocked }}</p>
  </div>`,
})
export class AchivementsPageComponent implements OnInit, OnDestroy {
  achievements: Achievement[] = [];
  subscriptions: Subscription[] = [];

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