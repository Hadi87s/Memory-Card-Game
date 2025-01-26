import { Button, TextField } from "@mui/material";
import { useContext, useRef } from "react"; // Adjust the import path as necessary
import { authContext } from "../providers/authProvider";
import { useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const nameField = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  // const [_, setUser] = useState<String>("");
  const { setUserName } = useContext(authContext);

  const handlePlayButton = () => {
    if (nameField.current) {
      setUserName(nameField.current.value);
      navigate("/game");
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
          InputProps={{
            style: { color: "white" }, // Text color set to white
          }}
          InputLabelProps={{
            style: { color: "white" }, // Label color set to white
          }}
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
