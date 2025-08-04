export const getRandomNum = (
  min: number,
  max: number,
  decimals: number = 1
): number => {
  const rand = Math.random() * (max - min) + min;
  return parseFloat(rand.toFixed(decimals));
};
