import { Button, TextField } from "@mui/material";
import React, { useRef } from "react";

const LoginScreen = () => {
  const nameField = useRef<HTMLInputElement>(null);
  const handlePlayButton = () => {
    if (nameField.current) {
      console.log(nameField.current.value);
    }
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
