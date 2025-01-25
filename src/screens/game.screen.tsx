import React, { useState } from "react";
import "./screens.css";
import Card from "../components/card/card";
import { ELevels, ICard } from "../types/@types";
import card from "../components/card/card";
import { createGameBoard } from "../utils/game.util";
const GameScreen = () => {
  const CURRENT_LEVEL = ELevels.MEDIUM;
  const [cards, setCard] = useState<ICard[]>(createGameBoard(CURRENT_LEVEL));
  return (
    <div className="screen game-screen">
      <div className="placeholder">Status</div>
      <div className={`placeholder game Level_${CURRENT_LEVEL}`}>
        {cards.map((_, index) => (
          <Card key={index} />
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
