import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { motion, useAnimation } from 'framer-motion';
import { closeAddFoodArea } from 'src/lib/slice/closeAddFoodAreaSlice';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { showFoodModal } from 'src/lib/slice/showFoodModalSlice';
import tw from 'tailwind-styled-components';
import FoodType from '../addFood/FoodType';
import ExpiryDate from '../addFood/ExpiryDate';
import FoodIconName from '../addFood/FoodIconName';
import FoodQuantity from '../addFood/FoodQuantity';
import Modal from '../addFood/Modal';

export interface IFood {
  id?: number;
  spaceType:
    | 'space_1'
    | 'space_2'
    | 'space_3'
    | 'space_4'
    | 'space_5'
    | 'space_6'
    | 'space_7';
  type: string;
  name: string;
  emoji: string;
  expiryDate: string;
  quantity: string;
}

const AddFoodSection = () => {
  const { close } = useAppSelector((state) => state.addFoodArea);
  const { foodModal } = useAppSelector((state) => state.foodModal);
  const { food } = useAppSelector((state) => state.food);
  const dispatch = useAppDispatch();
  const addFoodAnimation = useAnimation();

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (food.name.length !== 0) {
      dispatch(showFoodModal());
    } else {
      alert('모든 곳을 작성해주세요.');
    }
  };

  const onHandleOpenClick = () => {
    if (close) {
      addFoodAnimation.start({ x: 0 });
    } else {
      addFoodAnimation.start({ x: -245 });
    }
    dispatch(closeAddFoodArea());
  };

  return (
    <>
      <AddFoodBox
        transition={{ type: 'linear', duration: 0.3 }}
        initial={{ x: 0 }}
        animate={addFoodAnimation}
      >
        {close ? (
          <OpenAddFoodBtn onClick={onHandleOpenClick}>
            <FontAwesomeIcon
              icon={icon({ name: 'circle-arrow-right', style: 'solid' })}
              className='cursor-pointer'
            />
          </OpenAddFoodBtn>
        ) : (
          <OpenAddFoodBtn onClick={onHandleOpenClick}>
            <FontAwesomeIcon
              icon={icon({ name: 'circle-xmark', style: 'solid' })}
              className='cursor-pointer'
            />
          </OpenAddFoodBtn>
        )}
        <AddFoodHeader>
          <Title>냉장실 식료품 추가하기</Title>
        </AddFoodHeader>
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
      </AddFoodBox>
      {foodModal && <Modal />}
    </>
  );
};

const OpenAddFoodBtn = tw(motion.button)`
  w-8
  h-full
  absolute
  top-0
  right-0
  bg-yellow-light
  rounded-r-3xl
  z-5
`;
const AddFoodBox = tw(motion.section)`
  rounded-r-3xl
  bg-yellow
  shadow-2xl
  absolute
  top-0
  bottom-0
  w-68
  p-3
  pt-6
  pr-10
`;
const AddFoodHeader = tw.header`
  flex
  justify-between
  items-center
`;
const Title = tw.h2`
text-gray-dark
  font-bold
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

export default AddFoodSection;
