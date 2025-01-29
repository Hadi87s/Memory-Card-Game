import { createContext, Dispatch, useReducer } from "react";
import gameReducer from "../state/gameReducer";
import { GameAction, GameState } from "../types/@types";

interface IContext {
  children: React.ReactNode;
}

const INITIAL_STATE = {
  isComparing: false,
  invokedCard: [],
  elapsedTime: 0,
  isPuzzleComplete: false,
  moves: 0,
  username: "",
  score: 0,
  level: 0,
};

export const authContext = createContext<{
  gameState: GameState;
  dispatch: Dispatch<GameAction>;
}>({
  gameState: INITIAL_STATE,
  dispatch: () => {},
});

const AuthProvider = (props: IContext) => {
  const [gameState, dispatch] = useReducer(gameReducer, INITIAL_STATE);

  const value = {
    gameState,
    dispatch,
  };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
};

export default AuthProvider;
