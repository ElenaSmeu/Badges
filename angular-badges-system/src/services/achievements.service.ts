import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subject,
  catchError,
  of,
  takeUntil,
  tap,
} from 'rxjs';
import { Achievement } from '../utils/Achievement';

@Injectable({
  providedIn: 'root',
})
export class AchivementsService implements OnDestroy {
  private assetsUrl = '../assets/achivementsCatalog.json';
  private achievementSubject = new BehaviorSubject<Achievement[]>([]);
  achievements$ = this.achievementSubject.asObservable();

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.http
      .get<Achievement[]>(this.assetsUrl)
      .pipe(
        catchError(this.handleError<Achievement[]>('loadInitialData', [])),
        tap((data) => this.achievementSubject.next(data)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  getAchievements(): Observable<Achievement[]> {
    return this.achievements$;
  }

  updateAchievement(updatedAchievement: Achievement) {
    const currentAchievements = this.achievementSubject.value;
    const index = currentAchievements.findIndex(
      (achv) => achv.name == updatedAchievement.name
    );

    if (index !== -1) {
      const updatedAchievements = [...currentAchievements];
      updatedAchievements[index] = updatedAchievement;
      this.achievementSubject.next(updatedAchievements);
    }
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
