import { ChangeEvent } from 'react';
import { IFoodProps } from './FoodType';
import styled from 'styled-components';
import tw from 'tailwind-styled-components';

const FoodQuantity = ({ food, setFood }: IFoodProps) => {
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = { ...food, quantity: e.target?.value };
    setFood(result);
  };

  return (
    <>
      <Box>
        <span>수량</span>
        <input
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
  input {
    border-radius: 10px;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
    width: 100%;
    padding: 5px 10px;
    font-size: 14px;
  }
`;
const Desc = tw.span`
  text-xs
  text-orange
`;
export default FoodQuantity;
