import { useContext, useEffect, useState } from "react";
import { authContext } from "../providers/authProvider";
import PlayersStats from "../components/board-list-card/players-stats";
import { playerStats } from "../types/@types";

const player1: playerStats = {
  username: "Ali",
  moves: 22,
  elapsedTime: 50,
  score: 2,
  level: 2,
};
const player2: playerStats = {
  username: "Amr",
  moves: 50,
  elapsedTime: 230,
  score: 8,
  level: 4,
};
const player3: playerStats = {
  username: "Ali Odeh",
  moves: 67,
  elapsedTime: 364,
  score: 18,
  level: 6,
};
const player4: playerStats = {
  username: "Zahi",
  moves: 67,
  elapsedTime: 364,
  score: 18,
  level: 6,
};
const ScoreboardScreen = () => {
  const { gameState } = useContext(authContext);
  const player: playerStats = {
    username: gameState.username,
    moves: gameState.moves,
    elapsedTime: gameState.elapsedTime,
    score: gameState.score,
    level: gameState.level,
  };
  const [easyList, setEasyList] = useState<playerStats[]>([]);
  const [mediumList, setMediumList] = useState<playerStats[]>([]);
  const [hardList, setHardList] = useState<playerStats[]>([]);

  useEffect(() => {
    setEasyList((prevEasyList) => [...prevEasyList, player1]);
    setMediumList((prevMediumList) => [...prevMediumList, player2]);
    setHardList((prevHardList) => [...prevHardList, player3]);
    setHardList((prevHardList) => [...prevHardList, player4]);
    switch (gameState.level) {
      case 2: {
        setEasyList((prevEasyList) => [...prevEasyList, player]);
        break;
      }
      case 4: {
        setMediumList((prevMediumList) => [...prevMediumList, player]);
        break;
      }
      case 6: {
        setHardList((prevHardList) => [...prevHardList, player]);
        break;
      }
      default: {
      }
    }
  }, []);

  console.log(easyList);
  console.log(mediumList);
  console.log(hardList);
  return (
    <div className="scoreBoard">
      <PlayersStats level={2} players={easyList} />
      <PlayersStats level={4} players={mediumList} />
      <PlayersStats level={6} players={hardList} />
    </div>
  );
};

export default ScoreboardScreen;
