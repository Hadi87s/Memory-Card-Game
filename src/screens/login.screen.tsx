import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { useContext, useRef } from "react"; // Adjust the import path as necessary
import { authContext } from "../providers/authProvider";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ELevels } from "../types/@types";

const LoginScreen = () => {
  const nameField = useRef<HTMLInputElement>(null);
  const level = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { dispatch } = useContext(authContext);

  const handlePlayButton = () => {
    if (nameField.current && level.current) {
      dispatch({ type: "USER_LOGIN", payload: nameField.current.value }); // setting the username on login
      // here we'll send the level to the reducer as well.
      console.log(typeof level.current.value);

      dispatch({ type: "SELECT_LEVEL", payload: Number(level.current.value) });
      navigate("/game");
    }
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div className="loginContainer">
      <div className="login-form">
        <TextField
          inputRef={nameField}
          className="custom-mui-textfield"
          id="outlined-basic"
          label="Player Name"
          variant="outlined"
        />
        <FormControl fullWidth className="custom-mui-dropdown">
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
        >
          Play <PlayArrowRoundedIcon />
        </Button>
      </div>
    </div>
  );
};

export default LoginScreen;
