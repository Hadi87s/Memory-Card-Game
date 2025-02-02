import { useContext, useEffect, useState } from "react";
import { authContext } from "../providers/authProvider";
import PlayersStats from "../components/board-list-card/players-stats";
import { playerStats } from "../types/@types";
import { motion } from "framer-motion";
import { Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  // Load data from local storage on component mount
  useEffect(() => {
    const eList = JSON.parse(localStorage.getItem("eList") || "[]");
    const mList = JSON.parse(localStorage.getItem("mList") || "[]");
    const hList = JSON.parse(localStorage.getItem("hList") || "[]");

    setEasyList(eList);
    setMediumList(mList);
    setHardList(hList);
  }, []);

  // Add the current player to the appropriate list based on their level
  useEffect(() => {
    if (!gameState.username) return; // Skip if no player is logged in

    const updateList = (list: playerStats[], player: playerStats) => {
      // Check if the player already exists in the list
      const playerExists = list.some((p) => p.username === player.username);
      if (!playerExists) {
        return [...list, player];
      }
      return list;
    };

    switch (gameState.level) {
      case 2:
        setEasyList((prev) => updateList(prev, player));
        break;
      case 4:
        setMediumList((prev) => updateList(prev, player));
        break;
      case 6:
        setHardList((prev) => updateList(prev, player));
        break;
      default:
        break;
    }
  }, [gameState]);

  // Save data to local storage whenever the lists change
  useEffect(() => {
    localStorage.setItem("eList", JSON.stringify(easyList));
    localStorage.setItem("mList", JSON.stringify(mediumList));
    localStorage.setItem("hList", JSON.stringify(hardList));
  }, [easyList, mediumList, hardList]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      <div className="scoreBoardContainer">
        <div className="scoreBoard">
          <PlayersStats level={2} players={easyList} />
          <PlayersStats level={4} players={mediumList} />
          <PlayersStats level={6} players={hardList} />
        </div>
        <Stack alignItems={"center"}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
            }}
          >
            Play Again
          </Button>
        </Stack>
      </div>
    </motion.div>
  );
};

export default ScoreboardScreen;
