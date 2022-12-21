import { useAppSelector } from 'src/lib/hooks';
import { faCartPlus, faPen, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Input } from './FoodIconName';
import { cutLetter } from 'src/utils/cutLetter';
import { useSearchFood } from 'src/hooks/useSearchFood';
import Image from 'next/image';
import tw from 'tailwind-styled-components';

const SearchResult = () => {
  const { body } = useAppSelector((state) => state.searchFood);
  const {
    keyword,
    onKeywordChange,
    onProductNameSubmit,
    onCartIconClick,
    onSelfWriteClick,
  } = useSearchFood();

  return (
    <>
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
      <Desc>
        검색 결과는 한국식품안전관리인증원 HACCP에 등록된 제품만 나오며,
        찾으시는 제품이 나오지 않을 수 있습니다.
      </Desc>
      {!!+body?.totalCount?.length && (
        <>
          <CountBox>
            <span>검색결과</span>
            <span>{`${body.totalCount}건`}</span>
          </CountBox>
          <Results>
            {body?.items?.length !== 0 ? (
              body?.items?.map((result) => (
                <ResultItem key={result.item.imgurl1}>
                  <ImgBox>
                    <Img
                      src={result?.item.imgurl1}
                      alt='Picture of Food'
                      fill
                      sizes='(max-width: 768px) 300px,
                        (max-width: 1200px) 100px,
                        100px'
                      priority
                    />
                  </ImgBox>
                  <PlusCartBtn
                    role='button'
                    onClick={() =>
                      onCartIconClick(
                        result?.item.prdlstNm,
                        result?.item.imgurl1
                      )
                    }
                    icon={faCartPlus}
                    size='lg'
                  />
                  <Info>
                    {cutLetter(result.item.prdlstNm, 14)}{' '}
                    {!(result.item.capacity === '알수없음') &&
                      result.item.capacity?.slice(0, 4)}
                  </Info>
                </ResultItem>
              ))
            ) : (
              <Empty>검색 결과가 없습니다.</Empty>
            )}
            <AddBox>
              <Guide>찾으시는 결과가 없으세요?</Guide>
              <AddBtn onClick={onSelfWriteClick}>
                직접 식품 정보 작성하기
                <FontAwesomeIcon icon={faPen} />
              </AddBtn>
            </AddBox>
          </Results>
        </>
      )}
    </>
  );
};

{
  /* <Results>
{[1, 2, 3, 4, 5, 6].map((item) => (
  <ResultItem key={item}>
    <ImgBox />
    <Info />
  </ResultItem>
))}
</Results> */
}

const Form = tw.form`
  flex
  gap-1
  mb-2
`;
const Title = tw.h4`
  text-[14px]
  text-gray-dark
  my-2
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
const Desc = tw.p` 
  w-full
  text-[12px]
  text-blue-dark
  leading-4.5
  mb-2
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
  pb-4
  grid
  grid-cols-2
  gap-2
  mobile:max-h-[calc(100vh-theme(spacing.60))]
  rounded-3xl
  overflow-scroll
`;
const ResultItem = tw.div`
  relative
  bg-white
  p-2
  rounded-xl
  shadow-lg
  flex
  flex-col
  justify-between
  items-center
  gap-1
  h-36
`;
const PlusCartBtn = tw(FontAwesomeIcon)`
  shadow-md
  bg-red-light
  text-white
  hover:text-green
  hover:scale-105
  hover: ease-in-out
  hover:transition 
  hover:duration-300
  absolute
  top-[64px]
  left-[67px]
  self-end
  text-[14px]
  rounded-full
  p-2
`;
const ImgBox = tw.div`
  border
  border-gray-light
  relative
  w-24
  h-24
  rounded-lg
`;
const Img = tw(Image)`
  rounded-lg
  object-cover
  object-center
`;
const Info = tw.div`
  h-9
  flex 
  flex-col
  justify-center
  text-center
  text-[11px]
  break-words
  bg-gray-light
  w-full
  rounded-lg
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
const AddBox = tw.div` 
  col-span-2
  h-fit
  mt-4
`;
const Guide = tw.span`
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
  mb-2
`;

export default SearchResult;
