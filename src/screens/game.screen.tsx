import { useEffect, useState } from "react";
import "./screens.css";
import Card from "../components/card/card";
import { ELevels, ICard } from "../types/@types";

import { createGameBoard } from "../utils/game.util";

const GameScreen = () => {
  const CURRENT_LEVEL = ELevels.MEDIUM;
  const [cards] = useState<ICard[]>(createGameBoard(CURRENT_LEVEL));

  const [invokedCard, setInvokedCard] = useState<ICard[]>([]);

  const handleOnClick = (clickedCard: ICard) => {
    setInvokedCard((oldInvoked) => [...oldInvoked, clickedCard]);
  };

  useEffect(() => {
    if (invokedCard.length < 2) {
      console.log(invokedCard);
    } else {
      // console.log(invokedCard);
      if (invokedCard[0].id == invokedCard[1].id) {
        console.log("Match Found");
      }
    }
  }, [invokedCard]);
  // I've deleted the setCards since its not used here yet.
  return (
    <div className="screen game-screen">
      <div className="placeholder">Status</div>
      <div className={`placeholder game Level_${CURRENT_LEVEL}`}>
        {cards.map((card, index) => (
          <Card key={index} card={card} passEvent={handleOnClick} />
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
