export const getRandom = (arr: any[]) => {
  return arr[Math.floor(Math.random() * arr.length)] || 0;
};

export const getIsPoisoned = (poisonPercentage: number) => {
  return Math.random() < poisonPercentage / 100;
};
