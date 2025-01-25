import { useState } from "react";
import "./card.css";
import { ICard } from "../../types/@types";

interface IProps {
  card: ICard;
}
const card = (props: IProps) => {
  const [visible, setVisible] = useState(props.card.visible);

  return (
    <div
      onClick={(e) => {
        setVisible(!props.card.visible);
        props.card.visible = !props.card.visible;
        e.currentTarget.classList.toggle("flip");
      }}
      style={{
        backgroundImage: visible
          ? `url(https://clipart.com/thumbs.php?f=/1500/batch_12/001500-0012-0000${props.card.option}_tnb.png)`
          : "none",
      }}
      className="card"
      data-image="url(https://cdn.pixabay.com/photo/2017/10/03/20/30/book-2814026_1280.jpg)"
    >
      {props.card.id}
    </div>
  );
};

export default card;
