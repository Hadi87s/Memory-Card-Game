import { useContext, useEffect, useReducer, useRef, useState } from "react";
import "./screens.css";
import Card from "../components/card/card";
import { ELevels, ICard } from "../types/@types";

import { createGameBoard } from "../utils/game.util";
import { authContext } from "../providers/authProvider";
import gameReducer from "../state/gameReducer";

const GameScreen = () => {
  const CURRENT_LEVEL = ELevels.MEDIUM;
  const MAX_SCORE = CURRENT_LEVEL ** 2 / 2;
  const { username, score, setPlayerScore } = useContext(authContext);
  const intervalID = useRef<number>(0);
  const [cards, setCards] = useState<ICard[]>(createGameBoard(CURRENT_LEVEL));
  // const [invokedCard, setInvokedCard] = useState<ICard[]>([]);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [isPuzzleComplete, clearIfComplete] = useState<boolean>(false);
  const [tries, setTries] = useState<number>(0);

  const [gameState, dispatch] = useReducer(gameReducer, {
    cards: [],
    isComparing: false,
    invokedCard: [],
    elapsedTime: 0,
    isPuzzleComplete: false,
    tries: 0,
  });

  const handleOnClick = (clickedCard: ICard) => {
    if (
      !gameState.isComparing &&
      !clickedCard.isFigured &&
      !clickedCard.isRevealed &&
      gameState.invokedCard.length < 2
    ) {
      updateCards(clickedCard, true);
      // setInvokedCard((oldInvoked) => [...oldInvoked, clickedCard]);
      dispatch({type:"INVOKED_CARDS", payload:[clickedCard]});
    }
  };

  const updateCards = (clickedCard: ICard, check: boolean) => {
    const updatedCards = cards.map((card) => {
      return card.id == clickedCard.id
        ? { ...card, isFlipped: check, visible: check, isRevealed: true }
        : card;
    });
    setCards(() => updatedCards);
    // dispatch({ type: "UPDATE_CARDS", payload: updatedCards });
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0"); // Ensure 2 digits
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0"); // Ensure 2 digits
    return `${minutes}:${seconds}`;
  };

  // useEffect(() => {
  //   dispatch({ type: "UPDATE_CARDS", payload: createGameBoard(CURRENT_LEVEL) });
  // });

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
    if (gameState.invokedCard.length === 2) {
      //setIsComparing(true); // Disable further clicks
      dispatch({ type: "COMPARE_CARDS", payload: true });
      setTries(tries + 1);
      const [firstCard, secondCard] = gameState.invokedCard;

      if (firstCard.value === secondCard.value) {
        // Keep the cards flipped
        setPlayerScore();

        if (score + 1 == MAX_SCORE) {
          clearIfComplete(() => true);
        }
        const updatedCards = cards.map((card) =>
          card.id === firstCard.id || card.id === secondCard.id
            ? { ...card, isFlipped: true, visible: true, isFigured: true }
            : card
        );
        setCards(updatedCards);
        // dispatch({ type: "UPDATE_CARDS", payload: updatedCards });
      } else {
        // Flip the cards back after a delay
        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            card.id === firstCard.id || card.id === secondCard.id
              ? { ...card, isFlipped: false, visible: false, isRevealed: false } // Resetting the cards to the initial state
              : card
          );
          setCards(updatedCards);
          // dispatch({ type: "UPDATE_CARDS", payload: updatedCards });
        }, 1000);
      }
      // Reset the invokedCard array and allow new clicks after a delay
      setTimeout(() => {
        // setInvokedCard([]);
        dispatch({type:"INVOKED_CARDS", payload:[]}); // TODO: This should work just fine and invoke cards as usual

        //setIsComparing(false); // Re-enable clicks
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
          <span style={{ color: isPuzzleComplete ? "green" : "gold" }}>
            {formatTime(elapsedTime)}
          </span>
        </div>
        <div className="tries">Moves: {tries}</div>
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
