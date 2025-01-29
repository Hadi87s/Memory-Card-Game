import { useContext } from "react";
import { authContext } from "../providers/authProvider";

const ScoreboardScreen = () => {
  const { gameState, dispatch } = useContext(authContext);
  return <div>Hello {gameState.username ? gameState.username : "Unknown"}</div>;
};

export default ScoreboardScreen;
