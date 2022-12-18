import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { changeFoodInfo } from 'src/lib/slice/foodSlice';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { useRef } from 'react';
import { Input } from './FoodIconName';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Search = () => {
  const { food } = useAppSelector((state) => state.food);
  const { body } = useAppSelector((state) => state.searchFood);
  const searchFoodRef = useRef<HTMLInputElement>();
  const dispatch = useAppDispatch();

  const onProductNameSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = {
      ...food,
      name: searchFoodRef.current?.value,
    };
    dispatch(changeFoodInfo(result));
  };

  const onCartIconClick = () => {
    alert('냉장고에 추가되었습니다!');
  };

  return (
    <SearchFoodForm onSubmit={onProductNameSubmit}>
      <SearchInputBox>
        <Input
          ref={searchFoodRef}
          type='text'
          placeholder='찾으시는 식품을 검색해보세요'
        />
        <SearchBtn type='submit'>검색</SearchBtn>
      </SearchInputBox>
      <SearchResult>검색결과 {body.totalCount}</SearchResult>
      <Results>
        {body.items.map((result) => (
          <ResultItem key={result.item.imgurl1}>
            <ResultImg>
              <Img
                src={result?.item.imgurl1}
                alt='Picture of Food'
                fill
                sizes='(max-width: 768px) 300px,
              (max-width: 1200px) 100px,
              30px'
                priority
              />
            </ResultImg>
            <PlusCartBtn
              role='button'
              onClick={onCartIconClick}
              icon={faCartPlus}
              size='lg'
            />
            <ResultInfo>
              {result.item.prdlstNm} {result.item.capacity}
            </ResultInfo>
          </ResultItem>
        ))}
      </Results>
    </SearchFoodForm>
  );
};

const SearchFoodForm = tw.form`
`;
const SearchInputBox = tw.div`
  flex
  gap-1
  items-center
  justify-between
  py-2
`;
const SearchBtn = tw.button`
  border
  w-16
  text-[12px]
  rounded-md
  bg-green
  self-stretch
`;
const SearchResult = tw.span`
  text-[12px]
`;
const Results = tw.div`
  mt-2
  -mx-2
  px-2
  grid
  grid-cols-2
  gap-2
  h-[520px]
  overflow-scroll
  rounded-3xl
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
  border
  absolute
  top-[70px]
  left-18
  self-end
  hover:text-green
  text-[14px]
  rounded-full
  p-1.5
  bg-blue-light
`;
const ResultImg = tw.div`
  relative
  w-24
  h-24
  rounded-lg
`;
const Img = tw(Image)`
  rounded-lg
  border
  object-cover
  object-center
`;
const ResultInfo = tw.div`
  h-9
  flex 
  flex-col
  justify-center
  text-center
  text-[11px]
  break-words
`;

export default Search;
