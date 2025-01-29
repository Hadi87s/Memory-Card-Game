import { playerStats } from "../../types/@types";

interface IProps {
  player: playerStats;
}
const PlayerScore = (props: IProps) => {
  return (
    <div className="playerScore" style={{ marginBottom: "5px" }}>
      <span className="name">{props.player.username}</span>
      <span className="moves">{props.player.moves}</span>
      <span className="elapsedTime">{props.player.elapsedTime}</span>
      <span className="score">{props.player.score}</span>
    </div>
  );
};

export default PlayerScore;
