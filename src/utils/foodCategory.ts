export interface IfoodCategory {
  id: number;
  type: string;
}

export const foodCategories = [
  { id: 1, type: 'π₯© μ μ‘,μμ°' },
  { id: 2, type: 'π κ³ΌμΌ' },
  { id: 3, type: 'π₯¬ μ±μ' },
  { id: 4, type: 'π₯ κ³λ' },
  { id: 5, type: 'π₯« μμ€, μΌ' },
  { id: 6, type: 'π₯€ μλ£, μ°¨' },
  { id: 7, type: 'π₯ κ³‘λ¬Ό, λΉ΅' },
  { id: 8, type: 'π₯ λ°ν€νΈ' },
  { id: 9, type: 'π§ λμ νΈ' },
  { id: 10, type: 'πΎ μλ, μ€μΌ' },
  { id: 11, type: 'π§ μ μ ν' },
];

export type stringKeyObj = { [key: string]: string };

export const foodInfoNames: stringKeyObj = {
  type: 'μΉ΄νκ³ λ¦¬',
  name: 'μ΄λ¦',
  quantity: 'μλ',
  expiryDate: 'μ ν΅κΈ°ν',
};
