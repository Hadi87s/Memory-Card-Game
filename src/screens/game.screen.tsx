import { useEffect, useState } from "react";
import "./screens.css";
import Card from "../components/card/card";
import { ELevels, ICard } from "../types/@types";

import { createGameBoard } from "../utils/game.util";

const GameScreen = () => {
  const CURRENT_LEVEL = ELevels.MEDIUM;
  const [cards, setCards] = useState<ICard[]>(createGameBoard(CURRENT_LEVEL));

  const [invokedCard, setInvokedCard] = useState<ICard[]>([]);

  const handleOnClick = (clickedCard: ICard) => {
    setInvokedCard((oldInvoked) => [...oldInvoked, clickedCard]);
    updateCards(clickedCard, true);
  };

  const updateCards = (clickedCard: ICard, check: boolean) => {
    clickedCard.isFlipped = check;
    clickedCard.visible = check;
    cards.map((card) => {
      return card.id == clickedCard.id ? clickedCard : card;
    });
  };

  useEffect(() => {
    if (invokedCard.length < 2) {
      console.log(invokedCard);
    } else {
      if (invokedCard[0].id == invokedCard[1].id) {
        console.log("Math Found!");
        updateCards(invokedCard[0], true);
        updateCards(invokedCard[1], true);
        console.log(cards);
      } else {
        console.log("Not a Match");
        setTimeout(() => {
          updateCards(invokedCard[0], false);
          updateCards(invokedCard[1], false);
        }, 1000);
      }
      setTimeout(() => {
        setInvokedCard([]);
      }, 1000);
    }
  }, [invokedCard]);

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
