export const changeStrDate = (date: Date) => {
  return date.toISOString().substring(0, 10);
};
