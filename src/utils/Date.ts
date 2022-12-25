const today = new Date().toLocaleDateString();

export function addDay(date: string, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result.toLocaleDateString();
}
export function addMonth(date: string) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + 1);
  return result.toLocaleDateString();
}
export function addYear(date: string) {
  const result = new Date(date);
  result.setFullYear(result.getFullYear() + 1);
  return result.toLocaleDateString();
}
export function getLeftDays(expiryDate: string) {
  const diffDate = new Date(expiryDate).getTime() - new Date(today).getTime();
  const leftDays = diffDate / (1000 * 60 * 60 * 24);
  return leftDays;
}
