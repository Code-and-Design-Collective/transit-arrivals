export const getCurrentYear = (): number => {
  const currentDate = new Date();
  return currentDate.getFullYear();
};

export const getArrivalTimeMinutes = (
  arrival: number,
  queryTime: number
): number => {
  const differenceMillis = arrival - queryTime;
  const differenceMinutes = Math.floor(differenceMillis / (1000 * 60));

  return differenceMinutes;
};
