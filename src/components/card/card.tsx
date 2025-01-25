import React from "react";
import "./card.css";
import { ICard } from "../../types/@types";

interface IProps {
  card: ICard;
}
const card = (props: IProps) => {
  return <div className="card">{props.card.id}</div>;
};

export default card;
