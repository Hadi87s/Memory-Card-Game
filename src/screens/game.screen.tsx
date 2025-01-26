import { useContext, useEffect, useRef, useState } from "react";
import "./screens.css";
import Card from "../components/card/card";
import { ELevels, ICard } from "../types/@types";

import { createGameBoard } from "../utils/game.util";
import { authContext } from "../providers/authProvider";

const GameScreen = () => {
  const CURRENT_LEVEL = ELevels.EASY;
  const MAX_SCORE = CURRENT_LEVEL ** 2 / 2;
  const [cards, setCards] = useState<ICard[]>(createGameBoard(CURRENT_LEVEL));
  const [isComparing, setIsComparing] = useState(false);
  const { username, score, setPlayerScore } = useContext(authContext);
  const [invokedCard, setInvokedCard] = useState<ICard[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isPuzzleComplete, clearIfComplete] = useState<boolean>(false);
  const intervalID = useRef<number>(0);
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

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0"); // Ensure 2 digits
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0"); // Ensure 2 digits
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (!isPuzzleComplete) {
      intervalID.current = setInterval(() => {
        setElapsedTime((elapsed) => elapsed + 1);
      }, 1000);
    } else {
      clearInterval(intervalID.current);
    }
  }, [isPuzzleComplete]);

  useEffect(() => {
    if (invokedCard.length === 2) {
      setIsComparing(true); // Disable further clicks
      const [firstCard, secondCard] = invokedCard;

      if (firstCard.value === secondCard.value) {
        // Keep the cards flipped
        setPlayerScore();
        console.log(score); // TODO: REMOVE AFTER DEBUGGING
        console.log(MAX_SCORE); // TODO: REMOVE AFTER DEBUGGING

        if (score + 1 == MAX_SCORE) {
          clearIfComplete(() => true);
        }
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
      <div className="placeholder status">
        <div className="username">
          <span style={{ color: "white" }}>Welcome </span> {username}!{" "}
        </div>
        <div className="score">
          <span style={{ color: "white" }}>Score: </span> {score}
        </div>
        <div className="elapsed-time">
          <span style={{ color: "white" }}>Time Spent: </span>{" "}
          <span style={{ color: isPuzzleComplete ? "green" : "gold" }}>
            {formatTime(elapsedTime)}
          </span>
        </div>
      </div>
      <div className={`placeholder game Level_${CURRENT_LEVEL}`}>
        {cards.map((card, index) => (
          <Card key={index} card={card} passEvent={handleOnClick} />
        ))}
      </div>
    </div>
  );
};

export default GameScreen;
