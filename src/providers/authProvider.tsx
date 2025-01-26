import { createContext, useState } from "react";

interface IContext {
  children: React.ReactNode;
}

export const authContext = createContext<{
  username: string;
  score: number;
  setUserName: (name: string) => void;
  setPlayerScore: () => void;
}>({
  username: "",
  score: 0,
  setUserName: () => {},
  setPlayerScore: () => {},
});

const AuthProvider = (props: IContext) => {
  const [username, setUsername] = useState<string>("");
  const [score, setScore] = useState<number>(0);

  const setUserName = (name: string) => {
    setUsername(name);
  };

  const setPlayerScore = () => {
    setScore((oldScore) => oldScore + 1);
  };

  const value = {
    username: username,
    score: score,
    setUserName: setUserName,
    setPlayerScore: setPlayerScore,
  };
  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
};

export default AuthProvider;
