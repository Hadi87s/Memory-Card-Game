import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useContext, useRef } from "react"; // Adjust the import path as necessary
import { authContext } from "../providers/authProvider";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ELevels } from "../types/@types";
import { color, motion } from "framer-motion";

const LoginScreen = () => {
  const nameField = useRef<HTMLInputElement>(null);
  const level = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { dispatch } = useContext(authContext);

  const handlePlayButton = () => {
    if (!nameField.current?.value || !level.current?.value)
      alert("Please enter your name and select the wanted level.");
    else {
      if (nameField.current && level.current) {
        dispatch({ type: "USER_LOGIN", payload: nameField.current.value }); // setting the username on login
        dispatch({
          type: "SELECT_LEVEL",
          payload: Number(level.current.value),
        });
        navigate("/game");
      }
    }
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div className="login-form">
      <Container>
        <div className="image"></div>
        <Typography variant="h1" align="center" className="gameTitle">
          Memory Game
        </Typography>
        <motion.div
          initial={{ opacity: 0, y: 20 }} // Start 20px below, invisible
          animate={{ opacity: 1, y: 0 }} // Slide up to original position
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{
            duration: 0.4,
            ease: "easeInOut", // Smooth easing
          }}
        >
          <Stack
            spacing={1}
            alignItems="center"
            className="custom-mui-container"
          >
            <TextField
              inputRef={nameField}
              className="custom-mui-textfield"
              id="outlined-basic"
              label="Player Name"
              variant="outlined"
            />
            <FormControl className="custom-mui-dropdown">
              <InputLabel id="demo-simple-select-label">Level</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Label"
                onChange={handleChange}
                inputRef={level}
              >
                <MenuItem value={ELevels.EASY}>Easy</MenuItem>
                <MenuItem value={ELevels.MEDIUM}>Medium</MenuItem>
                <MenuItem value={ELevels.HARD}>Hard</MenuItem>
              </Select>
            </FormControl>
            <Button
              onClick={handlePlayButton}
              id="play"
              className="custom-mui-button"
              variant="contained"
              endIcon={<PlayArrowRoundedIcon />}
              size="large"
            >
              Play
            </Button>
          </Stack>
        </motion.div>
      </Container>
    </div>
  );
};

export default LoginScreen;
