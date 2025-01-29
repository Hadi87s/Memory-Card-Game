import { GameAction, GameState } from "../types/@types";

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "COMPARE_CARDS": {
      return { ...state, isComparing: action.payload };
    }
    case "INVOKED_CARDS": {
      if (action.payload) {
        return {
          ...state,
          invokedCard: [...state.invokedCard, action.payload],
        };
      } else {
        return { ...state, invokedCard: [] };
      }
    }
    case "INCREMENT_TIME": {
      return { ...state, elapsedTime: state.elapsedTime + action.payload };
    }
    case "COMPLETE_PUZZLE": {
      return { ...state, isPuzzleComplete: action.payload };
    }
    case "INCREMENT_TRIES": {
      return { ...state, moves: state.moves + 1 };
    }
    case "USER_LOGIN": {
      return { ...state, username: action.payload };
    }
    case "USER_SCORE": {
      return { ...state, score: state.score + 1 };
    }
    case "SELECT_LEVEL": {
      return { ...state, level: action.payload };
    }
    case "RESET_GAME": {
      return {
        ...state,
        isComparing: false,
        invokedCard: [],
        elapsedTime: 0,
        isPuzzleComplete: false,
        moves: 0,
        score: 0,
      };
    }
    default:
      return state;
  }
}

export default gameReducer;
