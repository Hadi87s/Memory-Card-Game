import { useContext, useEffect, useState } from "react";
import "./screens.css";
import Card from "../components/card/card";
import { ELevels, ICard } from "../types/@types";

import { createGameBoard } from "../utils/game.util";
import { authContext } from "../providers/authProvider";

const GameScreen = () => {
  const CURRENT_LEVEL = ELevels.MEDIUM;
  const [cards, setCards] = useState<ICard[]>(createGameBoard(CURRENT_LEVEL));
  const [isComparing, setIsComparing] = useState(false);
  const { username } = useContext(authContext);
  const [invokedCard, setInvokedCard] = useState<ICard[]>([]);

  const handleOnClick = (clickedCard: ICard) => {
    if (!isComparing && !clickedCard.isFigured && invokedCard.length < 2) {
      updateCards(clickedCard, true);
      setInvokedCard((oldInvoked) => [...oldInvoked, clickedCard]);
    }
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
      setIsComparing(true); // Disable further clicks
      const [firstCard, secondCard] = invokedCard;

      if (firstCard.value === secondCard.value) {
        // Keep the cards flipped

        const updatedCards = cards.map((card) =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isFlipped: true, visible: true, isFigured: true }
            : card
        );
        setCards(updatedCards);
      } else {
        // Flip the cards back after a delay
        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false, visible: false }
              : card
          );
          setCards(updatedCards);
        }, 1000);
      }

      // Reset the invokedCard array and allow new clicks after a delay
      setTimeout(() => {
        setInvokedCard([]);
        setIsComparing(false); // Re-enable clicks
      }, 1000);
    }
  }, [invokedCard]);

  return (
    <div className="screen game-screen">
      <div className="placeholder status">Welcome {username}!</div>
      <div className={`placeholder game Level_${CURRENT_LEVEL}`}>
        {cards.map((card, index) => (
          <Card key={index} card={card} passEvent={handleOnClick} />
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
