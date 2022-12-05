import { RefObject } from 'react';
import styled from 'styled-components';

interface IFoodName {
  nameRef: RefObject<HTMLInputElement>;
}

const FoodName = ({ nameRef }: IFoodName) => {
  return (
    <Name>
      <div></div>
      <input
        type='text'
        placeholder='식료품의 이름을 적어주세요.'
        ref={nameRef}
      />
    </Name>
  );
};

const Name = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  height: 30px;
  div {
    border-radius: 10px;
    width: 18%;
    height: inherit;
    background-color: #e6ffe6;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
  }
  input {
    border-radius: 10px;
    box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.2);
    width: 100%;
    padding: 5px;
    font-size: 14px;
  }
`;

export default FoodName;
