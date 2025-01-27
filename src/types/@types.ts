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
  option: number;
  isFlipped: boolean;
  isFigured: boolean;
  isRevealed: boolean;
}

export interface GameState {
  cards: ICard[];
  isComparing: boolean;
  invokedCard: ICard[];
  elapsedTime: number;
  isPuzzleComplete: boolean;
  tries: number;
}

export type GameAction =
  | { type: "UPDATE_CARDS"; payload: ICard[] }
  | { type: "CLICK_CARD"; payload: ICard[] }
  | { type: "COMPARE_CARDS"; payload: boolean }
  | { type: "INVOKED_CARDS"; payload: ICard[] }
  | { type: "INCREMENT_TIME"; payload?: number }
  | { type: "COMPLETE_PUZZLE"; payload: boolean }
  | { type: "INCREMENT_TRIES"; payload: number };
