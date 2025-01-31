import { useContext, useEffect, useRef, useState } from "react";
import "./screens.css";
import Card from "../components/card/card";
import { ICard } from "../types/@types";
import { createGameBoard } from "../utils/game.util";
import { authContext } from "../providers/authProvider";
import { useNavigate } from "react-router-dom";
import { Button, Stack } from "@mui/material";
import { motion } from "framer-motion";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ScoreboardRoundedIcon from "@mui/icons-material/ScoreboardRounded";
import ModeRoundedIcon from "@mui/icons-material/ModeRounded";
import Status from "../components/board-list-card/status/status";
import { formatTime } from "../utils/formatTime";
const GameScreen = () => {
  const { gameState, dispatch } = useContext(authContext);
  const CURRENT_LEVEL = gameState.level || 2;
  const MAX_SCORE = CURRENT_LEVEL ** 2 / 2;
  const intervalID = useRef<number>(0);
  const revealWin = useRef(null);
  const [cards, setCards] = useState<ICard[]>(createGameBoard(CURRENT_LEVEL));
  const navigate = useNavigate();
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



  useEffect(() => {
    if (!gameState.isPuzzleComplete) {
      intervalID.current = setInterval(() => {
        dispatch({ type: "INCREMENT_TIME", payload: 1 });
      }, 1000);
    } else {
      clearInterval(intervalID.current);
    }
    return () => clearInterval(intervalID.current);
  }, [gameState.isPuzzleComplete]);

  useEffect(() => {
    if (gameState.invokedCard.length === 2) {
      const [firstCard, secondCard] = gameState.invokedCard;
      dispatch({ type: "COMPARE_CARDS", payload: true });
      dispatch({ type: "INCREMENT_TRIES", payload: gameState.moves + 1 });

      if (firstCard.value === secondCard.value) {
        // Keep the cards flipped
        dispatch({ type: "USER_SCORE", payload: gameState.score + 1 });
        console.log(gameState.score);

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
        }, 800);
      }
      // Reset the invokedCard array and allow new clicks after a delay
      setTimeout(() => {
        dispatch({ type: "INVOKED_CARDS", payload: null });
        dispatch({ type: "COMPARE_CARDS", payload: false });
      }, 800);
    }
  }, [gameState.invokedCard]);

  useEffect(() => {
    return () => {
      dispatch({ type: "RESET_GAME" }); // Reset the game state when leaving
    };
  }, [location, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} // Start 20px below, invisible
      animate={{ opacity: 1, y: 0 }} // Slide up to original position
      exit={{ opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.4,
        ease: "easeInOut", // Smooth easing
      }}
    >
      <div className="screen game-screen">
        <div
          ref={revealWin}
          className={`gameWon ${gameState.isPuzzleComplete ? "reveal" : ""}`}
        >
          <div style={{ marginBottom: "10px", fontSize: "24px" }}>
            You've Won the Game!
          </div>
          <div className="stats">
            <span className="score" style={{ color: "orange" }}>
              Score: {gameState.score}
            </span>
            <span
              className="score"
              style={{
                color:
                  gameState.moves < 15
                    ? "yellow"
                    : gameState.moves > 15 && gameState.moves < 30
                    ? "orange"
                    : "#ff6d6d",
              }}
            >
              Moves: {gameState.moves}
            </span>
            <span
              className="time"
              style={{
                color:
                  gameState.elapsedTime < 50
                    ? "yellow"
                    : gameState.elapsedTime > 50 && gameState.elapsedTime < 100
                    ? "orange"
                    : "#ff6d6d",
              }}
            >
              Time: {formatTime(gameState.elapsedTime)}
            </span>
          </div>
          <Stack spacing={2} direction="row">
            <Button
              onClick={() => {
                dispatch({ type: "RESET_GAME" });
                setCards(createGameBoard(CURRENT_LEVEL));
                clearInterval(intervalID.current);
              }}
              variant="contained"
            >
              Play Again <PlayArrowRoundedIcon />
            </Button>
            <Button
              onClick={() => {
                dispatch({ type: "RESET_GAME" });
                setCards(createGameBoard(CURRENT_LEVEL));
                clearInterval(intervalID.current);
                navigate("/");
              }}
              variant="contained"
            >
              Switch Mode <ModeRoundedIcon />
            </Button>
            <Button
              onClick={() => {
                setCards(createGameBoard(CURRENT_LEVEL));
                clearInterval(intervalID.current);
                navigate("/score-board");
              }}
              variant="contained"
            >
              ScoreBoard <ScoreboardRoundedIcon />
            </Button>
          </Stack>
        </div>
        {/* <div className="common status">
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
        </div> */}
        <Status state={gameState} />

        <div className={`common game Level_${CURRENT_LEVEL}`}>
          {cards.map((card, index) => (
            <Card key={index} card={card} passEvent={handleOnClick} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default GameScreen;
