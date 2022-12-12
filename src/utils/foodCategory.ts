export interface IfoodCategory {
  id: number;
  type: string;
  emoji: string;
}

export const foodCategories = [
  { id: 1, type: '🥩 정육,수산', emoji: '1f969' },
  { id: 2, type: '🍎 과일,채소', emoji: '1f9c5' },
  { id: 3, type: '🧀 계란,유제품', emoji: '1f95a' },
  { id: 4, type: '🥫 소스,잼,양념', emoji: '1f96b' },
  { id: 5, type: '🥤 음료', emoji: '1f95b' },
  { id: 6, type: '🥐 곡물, 빵', emoji: '1f35e' },
];

export type stringKeyObj = { [key: string]: string };

export const foodInfoNames: stringKeyObj = {
  type: '카테고리',
  name: '이름',
  quantity: '수량',
  expiryDate: '유통기한',
};
