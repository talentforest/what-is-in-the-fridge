export const today = new Date().toISOString().substring(0, 10);

export const dateType = [
  { type: '하루', color: '#c2baff' },
  { type: '일주일', color: '#ffc1c1' },
  { type: '한달', color: '#a4deca' },
  { type: '일년', color: '#ffb87a' },
];

export function addDay(date: string, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return new Date(result).toISOString().substring(0, 10);
}
export function addMonth(date: string) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1);
  return new Date(result).toISOString().substring(0, 10);
}
export function addYear(date: string) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + 1);
  return new Date(result).toISOString().substring(0, 10);
}
export function getLeftDays(expiryDate: string) {
  const diffDate = new Date(expiryDate).getTime() - new Date(today).getTime();
  const leftDays = diffDate / (1000 * 60 * 60 * 24);
  return leftDays;
}
