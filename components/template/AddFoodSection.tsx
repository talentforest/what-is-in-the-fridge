import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState } from 'react';
import { changeStrDate } from '../../utils/changeStrDate';
import tw from 'tailwind-styled-components';
import FoodType from '../addFood/FoodType';
import ExpiryDate from '../addFood/ExpiryDate';
import FoodIconName from '../addFood/FoodIconName';
import FoodQuantity from '../addFood/FoodQuantity';
import Modal from '../addFood/Modal';

export interface IFood {
  type: string;
  name: string;
  emoji: string;
  expiryDate: string;
  quantity: string;
}

const AddFood = () => {
  const [modal, setModal] = useState(false);
  const [food, setFood] = useState({
    type: '',
    name: '',
    emoji: '1f34b',
    expiryDate: changeStrDate(new Date()),
    quantity: '',
  });

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (food.name.length !== 0) {
      setModal((prev) => !prev);
    } else {
      alert('모든 곳을 작성해주세요.');
    }
  };

  return (
    <>
      <AddFoodBox>
        <AddFoodHeader>
          <h2 className='text-gray-dark font-bold'>냉장실 식료품 추가하기</h2>
          <FontAwesomeIcon
            icon={icon({ name: 'circle-xmark', style: 'solid' })}
            className='cursor-pointer'
          />
        </AddFoodHeader>
        <FoodForm onSubmit={onSubmit}>
          <ItemTitle>식료품 카테고리 선택</ItemTitle>
          <FoodType food={food} setFood={setFood} />
          <ItemTitle>식료품 이름</ItemTitle>
          <FoodIconName food={food} setFood={setFood} />
          <ItemTitle>식료품 개수</ItemTitle>
          <FoodQuantity food={food} setFood={setFood} />
          <ItemTitle>식료품 유통기한</ItemTitle>
          <ExpiryDate food={food} setFood={setFood} />
          <SubmitBtn>냉장고에 식품 추가하기</SubmitBtn>
        </FoodForm>
      </AddFoodBox>
      {modal && <Modal setModal={setModal} food={food} />}
    </>
  );
};

const AddFoodBox = tw.section`
  rounded-r-3xl
  bg-yellow
  shadow-2xl
  absolute
  top-0
  bottom-0
  w-64
  p-5
`;
const AddFoodHeader = tw.header`
  flex
  justify-between
  items-center
`;
const FoodForm = tw.form``;
const ItemTitle = tw.h4`
  text-gray-dark
  text-xs 
  mb-2
  mt-5
`;

const SubmitBtn = tw.button`
  border
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

export default AddFood;
