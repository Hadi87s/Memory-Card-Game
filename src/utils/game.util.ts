import { ELevels, ICard } from "../types/@types";

const EMPTY_CARD = {
  id: 0,
  image: "",
  visible: false,
  option: 0,
};

export const createGameBoard = (level: ELevels): ICard[] => {
  const cards: ICard[] = Array.from({ length: level * level }, (_, index) => {
    if (index % 2 == 0)
      return {
        ...EMPTY_CARD,
        id: index,
        option: index + 11,
      };
    else
      return {
        ...EMPTY_CARD,
        id: index - 1,
        option: index + 10,
      };
  }).sort(() => Math.random() - 0.5);
  return cards;
};
