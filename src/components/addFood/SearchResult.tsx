import { faPen, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from './FoodIconName';
import { useSearchFood } from 'src/hooks/useSearchFood';
import { useAppSelector } from 'src/lib/hooks';
import { fetcher, url } from 'src/pages/api/productInfo';
import useSWR, { SWRConfig } from 'swr';
import tw from 'tailwind-styled-components';
import SearchItem from './SearchItem';

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
  const { keyword, onKeywordChange, onProductNameSubmit, onSelfWriteClick } =
    useSearchFood();
  const { food } = useAppSelector((state) => state.food);
  const { data, isLoading } = useSWR(
    food.name ? url(food.name) : null,
    fetcher
  );

  return (
    <SWRConfig
      value={{
        refreshInterval: 3000,
        fetcher: (resource, init) =>
          fetch(resource, init).then((res) => res.json()),
      }}
    >
      <Title>식품 검색</Title>
      <Form onSubmit={onProductNameSubmit}>
        <Input
          type='text'
          value={keyword}
          onChange={onKeywordChange}
          placeholder='찾으시는 식품을 검색해보세요'
        />
        <SearchBtn type='submit'>
          <FontAwesomeIcon icon={faSearch} size='lg' />
        </SearchBtn>
      </Form>
      {!!+data?.body?.totalCount?.length && (
        <>
          <CountBox>
            <span>검색결과</span>
            <span>{`${data?.body?.items.length}건`}</span>
          </CountBox>
          <Results>
            {data.body.items?.length !== 0 ? (
              data.body.items?.map((result: IFoodData) => (
                <SearchItem key={result?.item.imgurl1} result={result} />
              ))
            ) : (
              <Empty>검색 결과가 없습니다.</Empty>
            )}
          </Results>
        </>
      )}
      {isLoading && <LoadingBox>loading...</LoadingBox>}
      <Guide>직접 상품 정보를 작성하시겠어요?</Guide>
      <AddBtn onClick={onSelfWriteClick}>
        간단한 식품 정보 입력하기
        <FontAwesomeIcon icon={faPen} />
      </AddBtn>
    </SWRConfig>
  );
};

const LoadingBox = tw.div`
  h-1/3
  flex
  justify-center
  items-center
`;
const Form = tw.form`
  flex
  gap-1
  mb-2
`;
const Title = tw.h4`
  text-[14px]
  text-gray-dark
  my-2
  flex
  items-center
  gap-1
`;
const SearchBtn = tw.button`
  flex 
  gap-2
  justify-center
  items-center
  bg-green
  w-3/12
  h-10
  text-[14px]
  rounded-lg
  shadow-lg
`;
const CountBox = tw.div`
  text-[12px]
  flex
  justify-between
  pt-1
  text-gray
`;
const Results = tw.div`
  mt-2
  -mx-2
  px-2
  mb-5
  pb-4
  grid
  grid-cols-2
  gap-2
  mobile:max-h-[calc(100vh-theme(spacing.72))]
  rounded-3xl
  overflow-scroll
`;
const Empty = tw.div`
  text-[14px]
  col-span-2
  rounded-lg
  bg-white
  flex
  justify-center
  items-center
  shadow-lg
  py-5
`;
const Guide = tw.span`
  inline-block
  mt-4
  text-[14px]
`;
const AddBtn = tw.div<{ $color: boolean }>`
  shadow-lg
  bg-red-light
  cursor-pointer
  flex
  items-center
  justify-center
  gap-2
  p-2
  text-[13px]
  text-white
  w-full
  h-12
  rounded-lg
  mt-1
`;

export default SearchResult;
