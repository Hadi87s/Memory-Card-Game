export enum ELevels {
  EASY = 2,
  MEDIUM = 4,
  HARD = 6,
}

export interface ICard {
  id: number;
  value: number;
  image: string;
  visible: boolean;
  isFlipped: boolean;
  isFigured: boolean;
  isRevealed: boolean;
}

export interface GameState {
  isComparing: boolean;
  invokedCard: ICard[];
  elapsedTime: number;
  isPuzzleComplete: boolean;
  moves: number;
  username: string;
  score: number;
  level: number;
}

export type GameAction =
  | { type: "COMPARE_CARDS"; payload: boolean }
  | { type: "INVOKED_CARDS"; payload: ICard | null }
  | { type: "INCREMENT_TIME"; payload: number }
  | { type: "COMPLETE_PUZZLE"; payload: boolean }
  | { type: "INCREMENT_TRIES"; payload?: number }
  | { type: "USER_LOGIN"; payload: string }
  | { type: "USER_SCORE"; payload?: number }
  | { type: "SELECT_LEVEL"; payload: number };
