import { ELevels, ICard } from "../types/@types";

const EMPTY_CARD = {
  id: 0,
  image: "",
  visible: false,
};

export const createGameBoard = (level: ELevels): ICard[] => {
  const cards: ICard[] = Array.from({ length: level * level }, (_, index) => {
    if (index % 2 == 0) return { ...EMPTY_CARD, id: index };
    else return { ...EMPTY_CARD, id: index - 1 };
  }).sort(() => Math.random() - 0.5);

  return cards;
};
