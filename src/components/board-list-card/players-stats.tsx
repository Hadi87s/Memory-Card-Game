
import { playerStats } from "../../types/@types";
import "./players-stats.css";
interface IProps {
  players: playerStats[];
}
const PlayersStats = (props: IProps) => {
  return (
    <div className="levelCard">
      {props.players.map((player) => {
        return player.username;
      })}
    </div>
  );
};

export default PlayersStats;
