export const BASE_PATH =
  'https://apis.data.go.kr/B553748/CertImgListService/getCertImgListService';

export const url = (productName: string, number?: number) => {
  const productNum = number ? `prdlstReportNo=${number}` : '';
  return `${BASE_PATH}?serviceKey=${process.env.NEXT_PUBLIC_KEY_ID}&${productNum}&prdlstNm=${productName}&returnType=json&pageNo=1&numOfRows=30`;
};

export const fetcher = (url: string) => {
  return fetch(url).then((res) => res.json());
};
