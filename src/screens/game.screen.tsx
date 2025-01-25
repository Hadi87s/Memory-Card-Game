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
    const updatedCards = cards.map((card) => {
      return card.id == clickedCard.id
        ? { ...card, isFlipped: check, visible: check }
        : card;
    });
    setCards(() => updatedCards);
  };

  useEffect(() => {
    if (invokedCard.length === 2) {
      const [firstCard, secondCard] = invokedCard;

      if (firstCard.value === secondCard.value) {
        console.log("Match Found!");
        // Update both cards in a single state update
        const updatedCards = cards.map((card) =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isFlipped: true, visible: true }
            : card
        );
        setCards(updatedCards);
      } else {
        console.log("Not a Match");
        // Flip both cards back after a delay in a single state update
        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false, visible: false }
              : card
          );
          setCards(updatedCards);
        }, 1000);
      }

      // Reset the invokedCard array after a delay
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
