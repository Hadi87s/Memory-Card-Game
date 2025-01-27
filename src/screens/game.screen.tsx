import { useContext, useEffect, useRef, useState } from "react";
import "./screens.css";
import Card from "../components/card/card";
import { ELevels, ICard } from "../types/@types";
import { createGameBoard } from "../utils/game.util";
import { authContext } from "../providers/authProvider";

const GameScreen = () => {
  const CURRENT_LEVEL = ELevels.MEDIUM;
  const MAX_SCORE = CURRENT_LEVEL ** 2 / 2;
  const { gameState, dispatch } = useContext(authContext);
  const intervalID = useRef<number>(0);
  const [cards, setCards] = useState<ICard[]>(createGameBoard(CURRENT_LEVEL));

  const handleOnClick = (clickedCard: ICard) => {
    if (
      !gameState.isComparing &&
      !clickedCard.isFigured &&
      !clickedCard.isRevealed &&
      gameState.invokedCard.length < 2
    ) {
      updateCards(clickedCard, true);
      dispatch({ type: "INVOKED_CARDS", payload: clickedCard });
    }
  };

  const updateCards = (clickedCard: ICard, check: boolean) => {
    const updatedCards = cards.map((card) => {
      return card.id == clickedCard.id
        ? { ...card, isFlipped: check, visible: check, isRevealed: true }
        : card;
    });
    setCards(() => updatedCards);
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (!gameState.isPuzzleComplete) {
      intervalID.current = setInterval(() => {
        dispatch({ type: "INCREMENT_TIME", payload: 1 });
      }, 1000);
    } else {
      clearInterval(intervalID.current);
    }
  }, [gameState.isPuzzleComplete]);

  useEffect(() => {
    if (gameState.invokedCard.length === 2) {
      const [firstCard, secondCard] = gameState.invokedCard;
      dispatch({ type: "COMPARE_CARDS", payload: true });
      dispatch({ type: "INCREMENT_TRIES" });

      if (firstCard.value === secondCard.value) {
        // Keep the cards flipped
        dispatch({ type: "USER_SCORE" });

        if (gameState.score + 1 == MAX_SCORE) {
          dispatch({ type: "COMPLETE_PUZZLE", payload: true });
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
              ? { ...card, isFlipped: false, visible: false, isRevealed: false } // Resetting the cards to the initial state
              : card
          );

          setCards(updatedCards);
        }, 1000);
      }
      // Reset the invokedCard array and allow new clicks after a delay
      setTimeout(() => {
        dispatch({ type: "INVOKED_CARDS", payload: null }); // TODO: This should work just fine and invoke cards as usual
        dispatch({ type: "COMPARE_CARDS", payload: false });
      }, 1000);
    }
  }, [gameState.invokedCard]);

  return (
    <div className="screen game-screen">
      <div className="placeholder status">
        <div className="username">
          <span style={{ color: "#1976d2" }}>Welcome </span>{" "}
          {gameState.username ? gameState.username : "Unknown"}!{" "}
        </div>
        <div className="score">
          <span style={{ color: "#1976d2" }}>Score: </span> {gameState.score}
        </div>
        <div className="elapsed-time">
          <span style={{ color: "#1976d2" }}>Time Spent: </span>{" "}
          <span
            style={{ color: gameState.isPuzzleComplete ? "green" : "#111" }}
          >
            {formatTime(gameState.elapsedTime)}
          </span>
        </div>
        <div className="tries">
          <span style={{ color: "#1976d2" }}>Moves:</span> {gameState.moves}
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
