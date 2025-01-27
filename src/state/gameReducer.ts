import { ICard } from "../types/@types";

interface GameState {
  cards: ICard[];
  isComparing: boolean;
  isInvoked: ICard[];
  elapsedTime: number;
  isPuzzleComplete: boolean;
  tries: number;
}

type GameAction =
  | { type: "CLICK_CARD", payload: ICard }
  | { type: "COMPARE_CARDS", payload: boolean }
  | { type: "RESET_CARDS", payload: ICard }
  | { type: "INCREMENT_TIME", payload: number }
  | { type: "COMPLETE_PUZZLE", payload: boolean }
  | { type: "INCREMENT_TRIES", payload: number };

function gameReducer(state: GameState, Action: GameAction): any {
    switch(Action.type) {
        case "CLICK_CARD":{
            return {...state};
        }
    }
}
