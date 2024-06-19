export type Level = 'easy' | 'medium' | 'hard';

export interface Achievement {
  name: string;
  image: string;
  description: string;
  level: Level;
  timesUnlocked: number;
  lastUnlocked: string;
}

export const allLevels: Level[] = ['easy', 'medium', 'hard'];

export const levelToInt = (level: Level) => {
  switch (level) {
    case 'easy':
      return 0;
    case 'medium':
      return 1;
    case 'hard':
      return 2;
  }
};
