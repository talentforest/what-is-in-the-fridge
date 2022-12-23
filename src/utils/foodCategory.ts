export interface IfoodCategory {
  id: number;
  type: string;
}

export const foodCategories = [
  { id: 1, type: '🥩 정육,수산' },
  { id: 2, type: '🍎 과일' },
  { id: 3, type: '🥬 채소' },
  { id: 4, type: '🥚 계란' },
  { id: 5, type: '🥫 소스, 잼' },
  { id: 6, type: '🥤 음료, 차' },
  { id: 7, type: '🥐 곡물, 빵' },
  { id: 8, type: '🥘 밀키트' },
  { id: 9, type: '🧁 디저트' },
  { id: 10, type: '🍾 양념, 오일' },
  { id: 11, type: '🧀 유제품' },
];

export type stringKeyObj = { [key: string]: string };

export const foodInfoNames: stringKeyObj = {
  type: '카테고리',
  name: '이름',
  quantity: '수량',
  expiryDate: '유통기한',
};
