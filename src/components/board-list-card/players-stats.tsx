import { playerStats } from "../../types/@types";
import PlayerScore from "../player-score/player-score";
import "./players-stats.css";
interface IProps {
  players: playerStats[];
}
const PlayersStats = (props: IProps) => {
  return (
    <div className="levelCard">
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <span>Username</span>
        <span>Moves</span>
        <span>Time</span>
        <span>Score</span>
      </div>
      {props.players.map((player) => (
        <PlayerScore player={player} />
      ))}
    </div>
  );
};

export default PlayersStats;
