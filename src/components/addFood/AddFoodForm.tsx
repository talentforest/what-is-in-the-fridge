import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
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

const AddFoodForm = () => {
  const { tab } = useAppSelector((state) => state.tab);
  const { onSubmit } = useSubmitFood();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tab === '직접 식품 입력') {
      dispatch(changeFoodInfo(initialState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Form onSubmit={onSubmit}>
      {tab === '직접 식품 입력' && <Title>직접 식료품 정보 입력하기</Title>}
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
  );
};

const Form = tw.form`
  h-full
  overflow-scroll
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
  p-2
  shadow-md
  font-bold
  text-md
  text-gray-dark
  bg-green
`;

export default AddFoodForm;
