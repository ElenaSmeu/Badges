import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Achievement } from '../utils/Achievement';

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
