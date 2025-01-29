import { playerStats } from "../../types/@types";
import "./players-stats.css";
interface IProps {
  players: playerStats[];
}
const PlayersStats = (props: IProps) => {
  return (
    <div className="levelCard">
      {props.players.map((player) => (
        <div className="player">{player.username}</div> // this should be a component as well.
      ))}
    </div>
  );
};

export default PlayersStats;
