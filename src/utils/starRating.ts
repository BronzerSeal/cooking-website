import { getRandomNum } from "./getRandomNum";

export const StarRating = (stars: number) => {
  if (stars >= 4) {
    return {
      5: getRandomNum(70, 95),
      4: getRandomNum(40, 60),
      3: getRandomNum(10, 30),
      2: getRandomNum(10, 20),
      1: getRandomNum(1, 10),
    };
  } else if (stars >= 3) {
    return {
      5: getRandomNum(20, 40),
      4: getRandomNum(30, 50),
      3: getRandomNum(40, 70),
      2: getRandomNum(10, 30),
      1: getRandomNum(5, 10),
    };
  } else if (stars >= 2) {
    return {
      5: getRandomNum(5, 10),
      4: getRandomNum(7, 15),
      3: getRandomNum(10, 30),
      2: getRandomNum(30, 50),
      1: getRandomNum(20, 40),
    };
  }
  return {
    5: getRandomNum(1, 8),
    4: getRandomNum(4, 10),
    3: getRandomNum(7, 20),
    2: getRandomNum(30, 50),
    1: getRandomNum(40, 60),
  };
};
