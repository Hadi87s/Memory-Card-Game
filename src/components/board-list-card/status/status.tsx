import { GameState } from "../../../types/@types";
import { formatTime } from "../../../utils/formatTime";

interface IProps {
  state: GameState;
}

const Status = (props: IProps) => {
  return (
    <div className="common status">
      <div className="username">
        <span style={{ color: "#1976d2" }}>Welcome </span>{" "}
        {props.state.username ? props.state.username : "Unknown"}!{" "}
      </div>
      <div className="score">
        <span style={{ color: "#1976d2" }}>Score: </span> {props.state.score}
      </div>
      <div className="elapsed-time">
        <span style={{ color: "#1976d2" }}>Time Spent: </span>{" "}
        <span
          style={{ color: props.state.isPuzzleComplete ? "green" : "#f1f1f1" }}
        >
          {formatTime(props.state.elapsedTime)}
        </span>
      </div>
      <div className="tries">
        <span style={{ color: "#1976d2" }}>Moves:</span> {props.state.moves}
      </div>
    </div>
  );
};

export default Status;
