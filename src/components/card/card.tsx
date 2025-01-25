import "./card.css";
import { ICard } from "../../types/@types";

interface IProps {
  card: ICard;
  passEvent: (e: ICard) => void;
}
const card = (props: IProps) => {
  return (
    <div
      onClick={() => {
        props.passEvent(props.card);
      }}
      style={{
        backgroundImage: props.card.visible
          ? `url(https://clipart.com/thumbs.php?f=/1500/batch_12/001500-0012-0000${props.card.option}_tnb.png)`
          : "none",
      }}
      className={`card ${props.card.isFlipped ? "flip hideQM" : ""}`}
    >
      ?
    </div>
  );
};

export default card;
