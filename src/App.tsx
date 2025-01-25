import "./App.css";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import LoginScreen from "./screens/login.screen";
import GameScreen from "./screens/game.screen";
import LevelsScreen from "./screens/levels.screen";
import ScoreboardScreen from "./screens/score-board.screen";
import NotFound from "./screens/not-found-screen";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/game",
    element: <GameScreen />,
  },
  {
    path: "/levels",
    element: <LevelsScreen />,
  },
  {
    path: "/score-board",
    element: <ScoreboardScreen />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
const browserRouter = createBrowserRouter(routes);
function App() {
  return <RouterProvider router={browserRouter}></RouterProvider>;
}

export default App;
