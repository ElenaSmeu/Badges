import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
export interface Achievement {
  name: string;
  image: string;
  description: string;
  level: string;
  timesUnlocked: number;
}

@Injectable({
  providedIn: 'root',
})
export class AchivementsService {
  private assetsUrl = '../assets/achivementsCatalog.json';

  constructor(private http: HttpClient) {}

  getAchivements(): Observable<Achievement[]> {
    return this.http.get<Achievement[]>(this.assetsUrl);
  }
}
