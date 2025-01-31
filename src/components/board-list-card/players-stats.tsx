import { playerStats } from "../../types/@types";
import PlayerScore from "../player-score/player-score";
import "./players-stats.css";
interface IProps {
  players: playerStats[];
  level: number;
}
const PlayersStats = (props: IProps) => {
  return (
    <div className="levelCard">
      <div className="mode">
        {props.level === 2 ? "Easy" : props.level === 4 ? "Medium" : "Hard"}
        <div style={{ fontSize: "16px", color: "#1976d2" }}>
          (max-score: {props.level ** 2 / 2})
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          marginBottom: "10px",
        }}
      >
        <span>Username</span>
        <span>Moves</span>
        <span>Time</span>
        <span>Score</span>
      </div>
      {props.players.map((player, index) => (
        <PlayerScore key={player.username + index} player={player} />
      ))}
    </div>
  );
};

export default PlayersStats;
