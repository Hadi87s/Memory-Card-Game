import { ELevels, ICard } from "../types/@types";

export const createGameBoard = (level: ELevels): ICard[] => {
  return Array.from({ length: level * level }).map((_, index) => ({
    id: index + 1,
    image: "",
  }));
};
