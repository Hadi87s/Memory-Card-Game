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
      onClick={() => {
        setVisible(!props.card.visible);
        props.card.visible = !props.card.visible;
      }}
      style={{
        backgroundImage: visible
          ? "url(https://cdn.pixabay.com/photo/2017/10/03/20/30/book-2814026_1280.jpg)"
          : "none",
      }}
      className="card"
    >
      {props.card.id}
    </div>
  );
};

export default card;
