import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { changeFoodInfo } from 'src/lib/slice/foodSlice';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { faCartPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { v4 as uuidv4 } from 'uuid';
import { Input } from './FoodIconName';
import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { cutLetter } from 'src/utils/cutLetter';
import { searchFood } from 'src/lib/slice/searchFood';

const SearchResult = () => {
  const [keyword, setKeyword] = useState('');
  const { food } = useAppSelector((state) => state.food);
  const { body } = useAppSelector((state) => state.searchFood);
  const dispatch = useAppDispatch();

  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target; // 우선 e.target 에서 name 과 value 를 추출
    setKeyword(value);
  };

  const onCartIconClick = (name: string, imgUrl: string) => {
    const result = {
      ...food,
      name,
      id: uuidv4(),
      imgUrl,
    };
    dispatch(changeFoodInfo(result));
  };

  const onProductNameSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = {
      ...food,
      name: keyword,
    };
    dispatch(changeFoodInfo(result));
  };

  const onSelfWriteClick = () => {
    const result = {
      ...food,
      id: uuidv4(),
    };
    dispatch(changeFoodInfo(result));
    dispatch(searchFood({}));
    setKeyword('');
  };

  return (
    <>
      <SearchFoodForm onSubmit={onProductNameSubmit}>
        <SearchTitle>식품 검색</SearchTitle>
        <SearchInput>
          <Input
            value={keyword}
            onChange={onKeywordChange}
            type='text'
            placeholder='찾으시는 식품을 검색해보세요'
          />
          <SearchBtn type='submit'>검색</SearchBtn>
        </SearchInput>
        <Desc>
          검색 결과는 한국식품안전관리인증원 HACCP에 등록된 제품만 나오며,
          찾으시는 제품이 나오지 않을 수 있습니다.
        </Desc>
      </SearchFoodForm>
      {!!+body?.totalCount?.length && (
        <>
          <CountBox>
            <span>검색결과</span>
            {!!+body.totalCount && <span>{`${body.totalCount}개`}</span>}
          </CountBox>
          {body?.items?.length !== 0 ? (
            <Results>
              {body?.items?.map((result) => (
                <ResultItem key={result.item.imgurl1}>
                  <ImgBox>
                    <Img
                      src={result?.item.imgurl1}
                      alt='Picture of Food'
                      fill
                      sizes='(max-width: 768px) 300px,
                  (max-width: 1200px) 100px,
                  30px'
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
              ))}
              <Guide>찾으시는 결과가 없으세요?</Guide>
              <AddBox onClick={onSelfWriteClick}>
                <span>직접 식품 정보 작성하기</span>{' '}
                <FontAwesomeIcon icon={faPen} />
              </AddBox>
            </Results>
          ) : (
            <Results>
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <ResultItem key={item}>
                  <ImgBox />
                  <Info />
                </ResultItem>
              ))}
            </Results>
          )}
        </>
      )}
    </>
  );
};
const Guide = tw.span`
  w-full
  col-span-2
  text-[12px]
  pt-4
  px-2
`;
const AddBox = tw.div<{ $color: boolean }>`
  col-span-2
  shadow-lg
  ${(p: { $color: boolean }) => (p.$color ? 'bg-blue-dark' : 'bg-red-light')}
  cursor-pointer
  flex
  items-center
  justify-center
  gap-2
  p-2
  text-[13px]
  text-white
  border
  w-full
  h-16
  rounded-lg
  mb-2
`;
const SearchFoodForm = tw.form`
`;
const SearchTitle = tw.h4`
  text-[13px]
  text-gray-dark
  mt-3
`;
const SearchInput = tw.div`
  flex
  gap-1
  items-center
  justify-between
  py-2
`;
const SearchBtn = tw.button`
  border
  border-gray-light
  bg-gray-light
  w-12
  text-[12px]
  rounded-lg
  shadow-lg
  self-stretch
`;
const Desc = tw.p` 
  w-full
  text-sm
  text-blue-dark
  leading-4
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
  h-[430px]
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
  bg-yellow
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

export default SearchResult;
