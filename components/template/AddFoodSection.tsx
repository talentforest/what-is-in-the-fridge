import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useRef, useState } from 'react';
import { changeStrDate } from '../../utils/changeStrDate';
import tw from 'tailwind-styled-components';
import FoodType from '../addFood/FoodType';
import ExpiryDate from '../addFood/ExpiryDate';
import FoodName from '../addFood/FoodName';
import FoodQuantity from '../addFood/FoodQuantity';
import Modal from '../addFood/Modal';

const AddFood = () => {
  const [modal, setModal] = useState(false);
  const [foodType, setFoodType] = useState('');
  const [expiryDate, setExpiryDate] = useState(changeStrDate(new Date()));
  const nameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (
      foodType.length !== 0 &&
      expiryDate.length !== 0 &&
      nameRef.current?.value.length !== 0 &&
      quantityRef.current?.value.length !== 0
    ) {
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
          <FoodType foodType={foodType} setFoodType={setFoodType} />
          <ItemTitle>식료품 이름</ItemTitle>
          <FoodName nameRef={nameRef} />
          <ItemTitle>식료품 개수</ItemTitle>
          <FoodQuantity quantityRef={quantityRef} />
          <ItemTitle>식료품 유통기한</ItemTitle>
          <ExpiryDate expiryDate={expiryDate} setExpiryDate={setExpiryDate} />
          <SubmitBtn>냉장고에 식품 추가하기</SubmitBtn>
        </FoodForm>
      </AddFoodBox>
      {modal && nameRef.current?.value ? (
        <Modal
          setModal={setModal}
          foodType={foodType}
          name={nameRef.current?.value}
          quantity={quantityRef.current?.value}
          expiryDate={expiryDate}
        />
      ) : (
        <></>
      )}
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
  overflow-auto
  
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
