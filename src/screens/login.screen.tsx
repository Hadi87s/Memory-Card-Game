import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useContext, useRef } from "react"; // Adjust the import path as necessary
import { authContext } from "../providers/authProvider";
import { useNavigate } from "react-router-dom";
import React from "react";
import { ELevels } from "../types/@types";

const LoginScreen = () => {
  const nameField = useRef<HTMLInputElement>(null);
  const level = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const { setUserName } = useContext(authContext);

  const handlePlayButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (nameField.current && level.current) {
      setUserName(nameField.current.value);
      navigate("/game");
    }
  };

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div>
      <div className="login-form">
        <TextField
          inputRef={nameField}
          className="custom-mui-textfield"
          id="outlined-basic"
          label="Player Name"
          variant="outlined"
        />
        <FormControl fullWidth className="custom-mui-dropdown">
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={age}
            label="Age"
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
          Start Playing
        </Button>
      </div>
    </div>
  );
};

export default LoginScreen;
