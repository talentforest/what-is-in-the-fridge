import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useAnimation } from 'framer-motion';
import { useAppSelector } from 'src/lib/hooks';
import {
  faCartPlus,
  faPen,
  faRightLeft,
  faSearch,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { screens } from 'src/utils/screens';
import { useWindowSize, useSubmitFood, useSlideAnimation } from 'src/hooks';
import Modal from '../common/Modal';
import SearchResult from '../addFood/SearchResult';
import AddFoodForm from '../addFood/AddFoodForm';
import tw from 'tailwind-styled-components';
import BookmarkBtn from './BookmarkBtn';
import { FormEvent, useState } from 'react';
import TabBtns from '../addFood/TabBtns';

const AddFoodSection = () => {
  const [tab, setTab] = useState('search');
  const { modal } = useAppSelector((state) => state.foodModal);
  const { open, close } = useAppSelector((state) => state.addFoodArea);
  const { windowSize } = useWindowSize();
  const { onSubmit } = useSubmitFood();
  const slideXAnimation = useAnimation();
  const { onMobileClick, onDesktopClick, CLOSE_X } =
    useSlideAnimation(slideXAnimation);

  return (
    <>
      {screens.tablet >= windowSize.width ? (
        <>
          <CartBtn onClick={onMobileClick}>
            <CartIconBtn icon={faCartPlus} color='#66a8ea' size='3x' />
          </CartBtn>
          <BookmarkBtn />
          {open && <Overlay onClick={onMobileClick} />}
          <AddFoodBox
            transition={{ type: 'linear', duration: 0.3 }}
            initial={{ x: CLOSE_X }}
            animate={slideXAnimation}
          >
            <Title>냉장실 식료품 추가하기</Title>
            {tab === 'search' && <SearchResult />}
            {tab === 'input' && <AddFoodForm onSubmit={onSubmit} />}
            {tab === 'bookmark' && <div>hi</div>}
          </AddFoodBox>
        </>
      ) : (
        <AddFoodBox
          transition={{ type: 'linear', duration: 0.3, color: '#2d67d2' }}
          initial={close ? { x: CLOSE_X } : { x: 0 }}
          animate={slideXAnimation}
        >
          <Title>냉장고에 식료품 추가하기</Title>
          <TabBtns tab={tab} setTab={setTab} onDesktopClick={onDesktopClick} />
          {tab === 'search' && <SearchResult />}
          {tab === 'input' && <AddFoodForm onSubmit={onSubmit} />}
          {tab === 'bookmark' && <div>hi</div>}
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
  tablet:rounded-r-2xl
  mobile:rounded-r-3xl
  z-5
`;
const Title = tw.h2`
text-gray-dark
  font-bold
  mb-4
`;

const CartBtn = tw.button`
  bg-yellow
  shadow-xl
  rounded-full
  w-24
  h-24
  absolute
  bottom-4
  right-32
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

export default AddFoodSection;
