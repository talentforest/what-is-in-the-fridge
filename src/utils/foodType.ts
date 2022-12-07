export interface IfoodType {
  id: number;
  type: string;
  emoji: string;
}

export const foodTypes = [
  { id: 1, type: '정육,수산', emoji: '1f969' },
  { id: 2, type: '과일,채소', emoji: '1f9c5' },
  { id: 3, type: '계란,유제품', emoji: '1f95a' },
  { id: 4, type: '소스,잼,양념', emoji: '1f96b' },
  { id: 5, type: '음료', emoji: '1f95b' },
  { id: 6, type: '곡물', emoji: '1f35e' },
];
