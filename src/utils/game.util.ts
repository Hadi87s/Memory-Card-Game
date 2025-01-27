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
        value: index,
        isFlipped: false,
        isFigured: false,
        isRevealed: false,
      };
    else
      return {
        ...EMPTY_CARD,
        id: index,
        value: index - 1,
        isFlipped: false,
        isFigured: false,
        isRevealed: false,
      };
  }).sort(() => Math.random() - 0.5);
  return cards;
};
