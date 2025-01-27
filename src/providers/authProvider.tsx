import { createContext, Dispatch, useReducer, useState } from "react";
import gameReducer from "../state/gameReducer";
import { GameAction, GameState } from "../types/@types";

interface IContext {
  children: React.ReactNode;
}

const INITIAL_STATE_VALUE = {
  cards: [],
  isComparing: false,
  invokedCard: [],
  elapsedTime: 0,
  isPuzzleComplete: false,
  moves: 0,
  username: "",
  score: 0,
};
export const authContext = createContext<{
  gameState: GameState;
  dispatch: Dispatch<GameAction>;
}>({
  gameState: INITIAL_STATE_VALUE,
  dispatch: () => {},
});

const AuthProvider = (props: IContext) => {
  // const [username, setUsername] = useState<string>("");
  // const [score, setScore] = useState<number>(0);

  // const setUserName = (name: string) => {
  //   setUsername(name);
  // };

  // const setPlayerScore = () => {
  //   setScore((oldScore) => oldScore + 1);
  // };
  const [gameState, dispatch] = useReducer(gameReducer, INITIAL_STATE_VALUE);

  const value = {
    gameState,
    dispatch,
  };

  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
};

export default AuthProvider;
