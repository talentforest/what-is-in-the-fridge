export const changeStrDate = (date: Date) => {
  let offset = date.getTimezoneOffset() * 60000;
  let dateOffset = new Date(date.getTime() - offset);
  return dateOffset.toISOString().substring(0, 10);
};
