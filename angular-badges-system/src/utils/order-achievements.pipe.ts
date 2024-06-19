import { Pipe, PipeTransform } from '@angular/core';
import { Achievement, allLevels, levelToInt } from './Achievement';

@Pipe({
  name: 'orderAchievements',
  standalone: true,
})
/***
 * Order by the unlocked ones first!
 * Sort by the level from easy to hard
 */
export class OrderAchievementsPipe implements PipeTransform {
  transform(value: Achievement[]): Achievement[] {
    return allLevels
      .map((level) => ({
        level: level,
        items: value
          .filter((v) => v.level == level)
          .sort((a, b) => {
            return b.timesUnlocked - a.timesUnlocked;
          }),
      }))
      .sort((a, b) => {
        return levelToInt(a.level) - levelToInt(b.level);
      })
      .flatMap((group) => group.items);
  }
}
