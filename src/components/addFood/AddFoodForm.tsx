import tw from 'tailwind-styled-components';
import FoodType from '../addFood/FoodType';
import ExpiryDate from '../addFood/ExpiryDate';
import FoodIconName, { Input } from '../addFood/FoodIconName';
import FoodQuantity from '../addFood/FoodQuantity';
import { useRef } from 'react';
import { changeFoodInfo } from 'src/lib/slice/foodSlice';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';

interface IAddFoodFormProps {
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

const AddFoodForm = ({ onSubmit }: IAddFoodFormProps) => {
  const { food } = useAppSelector((state) => state.food);
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

  return (
    <>
      <SearchFoodForm onSubmit={onProductNameSubmit}>
        <Input
          ref={searchFoodRef}
          type='text'
          placeholder='찾으시는 식품을 검색해보세요'
        />
        <Input type='submit' value='검색' />
      </SearchFoodForm>
      <FoodForm onSubmit={onSubmit}>
        <ItemTitle>식료품 카테고리 선택</ItemTitle>
        <FoodType />
        <ItemTitle>식료품 이름</ItemTitle>
        <FoodIconName />
        <ItemTitle>식료품 개수</ItemTitle>
        <FoodQuantity />
        <ItemTitle>식료품 유통기한</ItemTitle>
        <ExpiryDate />
        <SubmitBtn>냉장고에 식품 추가하기</SubmitBtn>
      </FoodForm>
    </>
  );
};

const SearchFoodForm = tw.form`
 
`;
const FoodForm = tw.form`
`;
const ItemTitle = tw.h4`
  text-gray
  text-xs 
  mb-2
  mt-5
`;
const SubmitBtn = tw.button`
  w-full
  mt-4
  rounded-lg
  bg-green
  p-2
  text-xs 
  text-gray-dark
  font-bold
  shadow-md
`;

export default AddFoodForm;
