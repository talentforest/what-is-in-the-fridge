import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeFoodInfo } from 'src/lib/slice/foodSlice';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';
import { Input } from './FoodIconName';

const FoodQuantity = () => {
  const { food } = useAppSelector((state) => state.food);
  const dispatch = useAppDispatch();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = {
      ...food,
      quantity: e.target?.value,
    };
    dispatch(changeFoodInfo(result));
  };

  return (
    <>
      <Box>
        <Name>수량</Name>
        <Input
          type='number'
          placeholder='수량을 적어주세요.'
          value={food.quantity}
          onChange={onChange}
        />
        개
      </Box>
      <Desc>숫자만 입력가능해요.😊</Desc>
    </>
  );
};

const Box = tw.div`
  flex
  justify-between
  items-center
  gap-2
  text-[14px]
  mb-2
`;
const Name = tw.span`
  rounded-sm
  w-1/5
`;
const Desc = tw.span`
  text-[13px]
  text-orange
`;
export default FoodQuantity;
