import { Pipe, PipeTransform } from '@angular/core';
import { Achievement } from './Achievement';

@Pipe({
  name: 'filterUnlocked',
  standalone: true,
})
export class FilterPipe implements PipeTransform {
  transform(
    achievements: Achievement[],
    filterUnlocked: boolean
  ): Achievement[] {
    return achievements.filter((v) =>
      filterUnlocked ? v.timesUnlocked > 0 : true
    );
  }
}
