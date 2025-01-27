import { useContext, useEffect, useReducer, useRef, useState } from "react";
import "./screens.css";
import Card from "../components/card/card";
import { ELevels, ICard } from "../types/@types";

import { createGameBoard } from "../utils/game.util";
import { authContext } from "../providers/authProvider";
import gameReducer from "../state/gameReducer";

const GameScreen = () => {
  const CURRENT_LEVEL = ELevels.EASY;
  const MAX_SCORE = CURRENT_LEVEL ** 2 / 2;
  const { username, score, setPlayerScore } = useContext(authContext);
  const intervalID = useRef<number>(0);
  const [cards, setCards] = useState<ICard[]>(createGameBoard(CURRENT_LEVEL));
  // const [moves, setMoves] = useState<number>(0);

  const [gameState, dispatch] = useReducer(gameReducer, {
    cards: [],
    isComparing: false,
    invokedCard: [],
    elapsedTime: 0,
    isPuzzleComplete: false,
    moves: 0,
  });

  const handleOnClick = (clickedCard: ICard) => {
    if (
      !gameState.isComparing &&
      !clickedCard.isFigured &&
      !clickedCard.isRevealed &&
      gameState.invokedCard.length < 2
    ) {
      updateCards(clickedCard, true);
      dispatch({ type: "INVOKED_CARDS", payload: [clickedCard] });
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
        dispatch({ type: "INCREMENT_TIME" });
      }, 1000);
    } else {
      clearInterval(intervalID.current);
    }
  }, [gameState.isPuzzleComplete]);

  useEffect(() => {
    if (gameState.invokedCard.length === 2) {
      //setIsComparing(true); // Disable further clicks
      dispatch({ type: "COMPARE_CARDS", payload: true });
      // setMoves(moves + 1);
      dispatch({ type: "INCREMENT_TRIES" });
      const [firstCard, secondCard] = gameState.invokedCard;

      if (firstCard.value === secondCard.value) {
        // Keep the cards flipped
        setPlayerScore();

        if (score + 1 == MAX_SCORE) {
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
        dispatch({ type: "INVOKED_CARDS", payload: [] }); // TODO: This should work just fine and invoke cards as usual
        dispatch({ type: "COMPARE_CARDS", payload: false });
      }, 1000);
    }
  }, [gameState.invokedCard]);

  return (
    <div className="screen game-screen">
      <div className="placeholder status">
        <div className="username">
          <span style={{ color: "white" }}>Welcome </span>{" "}
          {username ? username : "Unknown"}!{" "}
        </div>
        <div className="score">
          <span style={{ color: "white" }}>Score: </span> {score}
        </div>
        <div className="elapsed-time">
          <span style={{ color: "white" }}>Time Spent: </span>{" "}
          <span
            style={{ color: gameState.isPuzzleComplete ? "green" : "gold" }}
          >
            {formatTime(gameState.elapsedTime)}
          </span>
        </div>
        <div className="tries">Moves: {gameState.moves}</div>
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
