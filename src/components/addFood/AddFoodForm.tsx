import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { changeFoodInfo } from 'src/lib/slice';
import { useEffect } from 'react';
import { initialState } from 'src/hooks/useAddFood';
import { Title } from './SearchResult';
import { useSubmitFood } from 'src/hooks';
import tw from 'tailwind-styled-components';
import FoodType from '../addFood/FoodType';
import ExpiryDate from '../addFood/ExpiryDate';
import FoodIconName from '../addFood/FoodIconName';
import FoodQuantity from '../addFood/FoodQuantity';
import Image from 'next/image';

const AddFoodForm = () => {
  const { tab } = useAppSelector((state) => state.tab);
  const { food } = useAppSelector((state) => state.food);
  const { onSubmit } = useSubmitFood();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tab === 'input') {
      dispatch(changeFoodInfo(initialState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackClick = () => {
    const result = { ...food, id: '' };
    dispatch(changeFoodInfo(result));
  };

  return (
    <>
      {tab === 'search' && (
        <BackBtn onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>뒤로가기</span>
        </BackBtn>
      )}
      {tab === 'input' && <Title>직접 식료품 정보 입력하기</Title>}
      {tab === 'bookmark' && <Title>즐겨찾는 식료품 추가 정보 입력하기</Title>}
      <Form onSubmit={onSubmit}>
        {food?.imgUrl && (
          <ImgBox>
            <Img
              src={food.imgUrl}
              alt={food.name}
              fill
              sizes='(max-width: 768px) 100px,
              (max-width: 1200px) 100px,
              30px'
              priority
            />
          </ImgBox>
        )}
        <ItemTitle>식료품 이름</ItemTitle>
        <FoodIconName />
        <ItemTitle>식료품 카테고리 선택</ItemTitle>
        <FoodType />
        <ItemTitle>식료품 개수</ItemTitle>
        <FoodQuantity />
        <ItemTitle>식료품 유통기한</ItemTitle>
        <ExpiryDate />
        <SubmitBtn>냉장고에 식품 추가하기</SubmitBtn>
      </Form>
    </>
  );
};

const BackBtn = tw.button`
  w-fit
  text-[14px]
  flex
  gap-1
  items-center
  mb-3
`;
const Form = tw.form`
  scrollbar-hide
  mobile:h-[calc(100vh-theme(spacing.16))]
  overflow-auto
  rounded-lg
  p-1.5
  -m-1.5
`;
const ImgBox = tw.div`
  relative
  w-24
  h-24
  rounded-lg
  shadow-md
  bg-white
`;
const Img = tw(Image)`
  rounded-lg
  object-cover
  object-center
`;
const ItemTitle = tw.h4`
  text-gray
  text-[14px]
  mb-2
  mt-5
  first:mt-0
`;
const SubmitBtn = tw.button`
  w-full
  h-12
  mt-8
  rounded-lg
  bg-green
  p-2
  text-md
  text-gray-dark
  font-bold
  shadow-md
`;

export default AddFoodForm;
