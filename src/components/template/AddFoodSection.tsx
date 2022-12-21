import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useAnimation } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import {
  faCartPlus,
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { screens } from 'src/utils/screens';
import { useEffect } from 'react';
import { getProductInfo } from 'src/pages/api/productInfo';
import { searchFood } from 'src/lib/slice/index';
import { useWindowSize, useSubmitFood, useSlideAnimation } from 'src/hooks';
import Modal from '../common/Modal';
import SearchResult from '../addFood/SearchResult';
import AddFoodForm from '../addFood/AddFoodForm';
import tw from 'tailwind-styled-components';

const AddFoodSection = () => {
  const { food } = useAppSelector((state) => state.food);
  const { modal } = useAppSelector((state) => state.foodModal);
  const { open, close } = useAppSelector((state) => state.addFoodArea);
  const { windowSize } = useWindowSize();
  const slideXAnimation = useAnimation();
  const { onSubmit } = useSubmitFood();
  const { onMobileClick, onDesktopClick, CLOSE_X } =
    useSlideAnimation(slideXAnimation);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const productName = food.name;
    if (productName) {
      getProductInfo(productName).then((data) => {
        dispatch(searchFood(data.body));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [food.name]);

  return (
    <>
      {screens.tablet >= windowSize.width ? (
        <>
          <CartBtn onClick={onMobileClick}>
            <CartIconBtn icon={faCartPlus} color='#66a8ea' size='3x' />
          </CartBtn>
          {open && <Overlay onClick={onMobileClick} />}
          <AddFoodBox
            transition={{ type: 'linear', duration: 0.3 }}
            initial={{ x: CLOSE_X }}
            animate={slideXAnimation}
          >
            <Title>냉장실 식료품 추가하기</Title>
            {!food.id ? <SearchResult /> : <AddFoodForm onSubmit={onSubmit} />}
          </AddFoodBox>
        </>
      ) : (
        <AddFoodBox
          transition={{ type: 'linear', duration: 0.3, color: '#2d67d2' }}
          initial={close ? { x: CLOSE_X } : { x: 0 }}
          animate={slideXAnimation}
        >
          <OpenBarBtn onClick={onDesktopClick}>
            <Icon
              icon={close ? faCircleArrowRight : faCircleArrowLeft}
              size='lg'
            />
          </OpenBarBtn>
          <Title>냉장실 식료품 추가하기</Title>
          {!food.id ? <SearchResult /> : <AddFoodForm onSubmit={onSubmit} />}
        </AddFoodBox>
      )}
      {modal && <Modal />}
    </>
  );
};

const AddFoodBox = tw(motion.section)`
  bg-yellow-light
  shadow-3xl
  absolute
  top-0
  bottom-0
  tablet:w-72
  mobile:w-64
  p-4
  tablet:rounded-none
  mobile:rounded-r-3xl
  z-5
`;
const Title = tw.h2`
text-gray-dark
  font-bold
  mb-4
`;
const Icon = tw(FontAwesomeIcon)`
  cursor-pointer
`;
const CartBtn = tw.button`
  bg-yellow
  shadow-xl
  rounded-full
  tablet:h-40
  tablet:w-40
  mobile:w-24
  mobile:h-24
  absolute
  tablet:bottom-12
  tablet:right-12
  mobile:bottom-4
  mobile:right-4
  flex
  justify-center
  items-center
  cursor-pointer
`;
const CartIconBtn = tw(FontAwesomeIcon)`
  pr-1
  pt-2
`;
const Overlay = tw.div`
  absolute
  ${(p: { $addedFoodModal: boolean }) =>
    p.$addedFoodModal ? '-top-12' : 'top-0'}
  right-0
  w-full
  h-screen
  bg-gray-dark
  opacity-50
  cursor-pointer
  z-1
`;
const OpenBarBtn = tw(motion.button)`
  tablet:block
  mobile:hidden
  w-10
  h-full
  absolute
  top-0
  -right-10
  bg-green
  rounded-r-3xl
  z-5
`;

export default AddFoodSection;
