import { createContext, useState } from "react";
interface IContext {
  children: React.ReactNode;
}
export const authContext = createContext<{
  username: string;
  setUserName: (name: string) => void;
}>({
  username: "",
  setUserName: () => {},
});
const AuthProvider = (props: IContext) => {
  const [username, setUsername] = useState<string>("Unknown");

  const setUserName = (name: string) => {
    setUsername(name);
  };

  const value = {
    username: username,
    setUserName: setUserName,
  };
  return (
    <authContext.Provider value={value}>{props.children}</authContext.Provider>
  );
};

export default AuthProvider;
