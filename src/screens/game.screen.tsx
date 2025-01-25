import { useState } from "react";
import "./screens.css";
import Card from "../components/card/card";
import { ELevels, ICard } from "../types/@types";

import { createGameBoard } from "../utils/game.util";

const GameScreen = () => {
  const CURRENT_LEVEL = ELevels.MEDIUM;
  
  const [cards] = useState<ICard[]>(createGameBoard(CURRENT_LEVEL)); // I've deleted the setCards since its not used here yet.
  return (
    <div className="screen game-screen">
      <div className="placeholder">Status</div>
      <div className={`placeholder game Level_${CURRENT_LEVEL}`}>
        {cards.map((card, index) => (
          <Card key={index} card={card}/>
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
