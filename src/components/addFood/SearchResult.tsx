import { faDeleteLeft, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from './FoodIconName';
import { useSearchFood } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { fetcher, url } from 'src/pages/api/productInfo';
import { useEffect, useRef } from 'react';
import { changeKeyword } from 'src/lib/slice';
import SearchItem from './SearchItem';
import AddFoodForm from './AddFoodForm';
import useSWR, { SWRConfig } from 'swr';
import tw from 'tailwind-styled-components';
import Loading from '../common/Loading';

export interface IFoodData {
  item: {
    allergy: string;
    barcode: string;
    capacity: string;
    imgurl1: string;
    imgurl2: string;
    manufacture: string;
    nutrient: string;
    prdkind: string;
    prdkindstate: string;
    prdlstNm: string;
    prdlstReportNo: string;
    productGb: string;
    rawmtrl: string;
    rnum: string;
    seller: string;
  };
}

const SearchResult = () => {
  const { tab } = useAppSelector((state) => state.tab);
  const { keyword } = useAppSelector((state) => state.keyword);
  const { food } = useAppSelector((state) => state.food);
  const { onKeywordChange, onKeywordSubmit, removeKeyword } = useSearchFood();

  const fetch_condition = keyword !== '' && food.name ? url(food.name) : null;
  const { data, isLoading } = useSWR(fetch_condition, fetcher);

  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (tab === 'search') {
      dispatch(changeKeyword(''));
    }
    inputRef.current?.focus();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {!food?.id ? (
        <>
          <Title>상품 검색하기</Title>
          <Form onSubmit={onKeywordSubmit}>
            <Input
              ref={inputRef}
              type='text'
              value={keyword}
              onChange={onKeywordChange}
              placeholder='냉장고 넣을 식품을 검색해보세요.'
            />
            {data && keyword !== '' ? (
              <SearchBtn type='button' onClick={removeKeyword}>
                <FontAwesomeIcon icon={faDeleteLeft} size='lg' />
              </SearchBtn>
            ) : (
              <SearchBtn type='submit'>
                <FontAwesomeIcon icon={faSearch} size='lg' />
              </SearchBtn>
            )}
          </Form>
          <ResultDesc>
            검색 결과는 한국식품안전관리인증원 HACCP에서 제공하는 정보만
            제공됩니다.
          </ResultDesc>
          {!isLoading ? (
            <>
              {data?.body && (
                <ResultNum>
                  <span>검색결과</span>
                  <span>{`${data?.body.items.length}건`}</span>
                </ResultNum>
              )}
              <ResultList>
                {data?.body.items.length !== 0 ? (
                  data?.body.items?.map((result: IFoodData) => (
                    <SearchItem key={result?.item.imgurl1} result={result} />
                  ))
                ) : (
                  <EmptyBox>검색 결과가 없습니다.</EmptyBox>
                )}
              </ResultList>
            </>
          ) : (
            <Loading />
          )}
        </>
      ) : (
        <AddFoodForm />
      )}
    </SWRConfig>
  );
};

export const Title = tw.h2`
  text-md
  mb-3
  font-semibold
`;
const Form = tw.form`
  flex
  gap-1
  mb-2
`;
const SearchBtn = tw.button`
  bg-white
  absolute
  right-4
  px-1
  m-1
  text-gray
  w-fit
  h-8
  text-[14px]
`;
const ResultDesc = tw.p`
  inline-block
  p-1
  text-[11px]
  mb-2
  text-gray
`;
const ResultNum = tw.div`
  text-[12px]
  flex
  justify-between
  pt-1
  text-gray
`;
const ResultList = tw.section`
  scrollbar-hide
  mt-1
  -mx-2
  px-2
  pb-4
  grid
  grid-cols-2
  auto-rows-min
  gap-2
  h-[calc(100vh-theme(spacing.48))]
  rounded-3xl
  overflow-scroll
`;
const EmptyBox = tw.div`
  text-[14px]
  col-span-2
  rounded-xl
  bg-white
  flex
  justify-center
  items-center
  shadow-lg
  py-5
  h-40
`;

export default SearchResult;
