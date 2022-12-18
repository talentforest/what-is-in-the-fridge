export const BASE_PATH =
  'https://apis.data.go.kr/B553748/CertImgListService/getCertImgListService';

export const getProductInfo = (productName: string, productNo?: number) => {
  const productQuery = productNo ? `&prdlstReportNo=${productNo}` : '';

  return fetch(
    `${BASE_PATH}?serviceKey=${process.env.NEXT_PUBLIC_KEY_ID}${productQuery}&prdlstNm=${productName}&returnType=json&pageNo=1&numOfRows=50`
  ).then((res) => res.json());
};
