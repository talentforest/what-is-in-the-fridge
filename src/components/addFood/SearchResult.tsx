import {
  faChevronLeft,
  faDeleteLeft,
  faSearch,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from './FoodIconName';
import { useSearchFood } from 'src/hooks';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { fetcher, url } from 'src/pages/api/productInfo';
import { useEffect, useRef } from 'react';
import { changeFoodInfo, changeKeyword } from 'src/lib/slice';
import SearchItem from './SearchItem';
import AddFoodForm from './AddFoodForm';
import useSWR, { SWRConfig } from 'swr';
import Loading from '../common/Loading';
import tw from 'tailwind-styled-components';
import Image from 'next/image';

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
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  const fetchUrl = () => {
    if (keyword !== '' && food.name) return url(food.name);
    return null;
  };
  const { data, isLoading } = useSWR(fetchUrl(), fetcher);

  useEffect(() => {
    if (tab === '식품 검색') {
      dispatch(changeKeyword(''));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const onBackClick = () => {
    const result = { ...food, id: '' };
    dispatch(changeFoodInfo(result));
  };

  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      {!food?.id ? (
        <FirstStepBox>
          <Form onSubmit={onKeywordSubmit}>
            <Title>상품 검색하기</Title>
            <InputBox>
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
            </InputBox>
            <Desc>
              검색 결과는 한국식품안전관리인증원 HACCP에서 제공하는 식품 정보만
              제공됩니다.
            </Desc>
          </Form>
          {!isLoading ? (
            <>
              {data?.body && (
                <ResultNum>
                  <span>검색결과:</span>
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
        </FirstStepBox>
      ) : (
        <NextStepBox>
          {tab === '식품 검색' && (
            <BackBtn onClick={onBackClick}>
              <FontAwesomeIcon icon={faChevronLeft} />
              <span>뒤로가기</span>
            </BackBtn>
          )}
          {food?.imgUrl && (
            <ImgBox>
              <Img
                src={food.imgUrl}
                alt={food.name}
                fill
                sizes='300px'
                priority
              />
            </ImgBox>
          )}
          <AddFoodForm />
        </NextStepBox>
      )}
    </SWRConfig>
  );
};

const FirstStepBox = tw.div`
  h-full
  flex
  flex-col
`;

const Form = tw.form`
  flex
  flex-col
  gap-1
  mb-2
`;

export const Title = tw.h2`
  text-md
  mb-2
  font-bold
`;

const InputBox = tw.div`
  relative
`;

const SearchBtn = tw.button`
  absolute
  w-fit
  h-9
  top-0
  right-0
  px-1.5
  m-1
  text-md
  text-gray
  bg-white
`;

const Desc = tw.p`
  inline-block
  text-sm
  my-1
`;

const ResultNum = tw.div`
  text-[12px]
  flex
  items-center
  gap-2
  mb-2
`;

const ResultList = tw.section`
  h-full  
  overflow-scroll
  scrollbar-hide
  grid
  grid-cols-2
  auto-rows-min
  gap-2
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

const NextStepBox = tw.div`
  h-full
  overflow-auto
  p-1
`;

export const BackBtn = tw.button`
  w-fit
  text-[14px]
  flex
  gap-1
  items-center
  mb-3
`;

const ImgBox = tw.div`
  relative
  w-24
  h-24
  rounded-lg
  shadow-md
  mb-4
  bg-white
`;

const Img = tw(Image)`
  rounded-lg
  object-cover
  object-center
`;

export default SearchResult;
