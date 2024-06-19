import { Pipe, PipeTransform } from '@angular/core';
import { Achievement } from './Achievement';

@Pipe({
  name: 'searchAchievements',
  standalone: true,
})
export class SearchPipe implements PipeTransform {
  transform(achievements: Achievement[], searchTerm: string): Achievement[] {
    const processedString = (s: string) => {
      return s.toLowerCase().trim();
    };

    return searchTerm.length > 2
      ? achievements.filter(
          (v) =>
            processedString(v.description).includes(
              processedString(searchTerm)
            ) || processedString(v.name).includes(processedString(searchTerm))
        )
      : achievements;
  }
}
