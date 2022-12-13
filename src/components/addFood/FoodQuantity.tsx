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
        <span>수량</span>
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

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  height: 30px;
  span {
    border-radius: 10px;
    width: 30%;
  }
`;
const Desc = tw.span`
  text-xs
  text-orange
`;
export default FoodQuantity;
