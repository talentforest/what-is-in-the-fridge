import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useAnimation } from 'framer-motion';
import { useAppSelector } from 'src/lib/hooks';
import { faCartPlus, faClose } from '@fortawesome/free-solid-svg-icons';
import { screens } from 'src/utils/screens';
import { useWindowSize, useSlideAnimation } from 'src/hooks';
import SearchResult from '../addFood/SearchResult';
import AddFoodForm from '../addFood/AddFoodForm';
import tw from 'tailwind-styled-components';
import TabBtns from '../addFood/TabBtns';
import BookmarkList from '../addFood/BookmarkList';
import AddModal from '../addFood/AddModal';

const AddFoodSection = () => {
  const { tab } = useAppSelector((state) => state.tab);
  const { modal } = useAppSelector((state) => state.foodModal);
  const { open, close } = useAppSelector((state) => state.addFoodArea);
  const { windowSize } = useWindowSize();
  const slideXAnimation = useAnimation();
  const { onFarSlideClick, onSlideClick, CLOSE_X, FAR_CLOSE_X } =
    useSlideAnimation(slideXAnimation);

  return (
    <>
      {screens.desktop >= windowSize.width ? (
        <>
          <CartBtn onClick={onFarSlideClick}>
            <CartIconBtn icon={faCartPlus} color='#66a8ea' />
          </CartBtn>
          {open && <Overlay onClick={onFarSlideClick} />}
          <AddFoodBox
            transition={{ type: 'linear', duration: 0.6 }}
            initial={{ x: FAR_CLOSE_X }}
            animate={slideXAnimation}
          >
            <TabBtns onSlideClick={onSlideClick}></TabBtns>
            {tab === 'search' && <SearchResult />}
            {tab === 'input' && <AddFoodForm />}
            {tab === 'bookmark' && <BookmarkList />}
          </AddFoodBox>
        </>
      ) : (
        <AddFoodBox
          transition={{ type: 'linear', duration: 0.6, color: '#2d67d2' }}
          initial={close ? { x: CLOSE_X } : { x: 0 }}
          animate={slideXAnimation}
        >
          <CloseBtn onClick={onSlideClick}>
            <FontAwesomeIcon icon={faClose} size='xl' color='#aaa' />
          </CloseBtn>
          <TabBtns onSlideClick={onSlideClick} />
          {tab === 'search' && <SearchResult />}
          {tab === 'input' && <AddFoodForm />}
          {tab === 'bookmark' && <BookmarkList />}
        </AddFoodBox>
      )}
      {modal && <AddModal />}
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
  mobile:w-10/12
  p-4
  tablet:rounded-r-2xl
  mobile:rounded-r-3xl
  z-5
`;
const CartBtn = tw.button`
  bg-yellow
  shadow-xl
  rounded-full
  mobile:w-24
  mobile:h-24
  tablet:w-36
  tablet:h-36
  absolute
  tablet:right-10
  tablet:bottom-10
  mobile:bottom-4
  mobile:right-4
  flex
  justify-center
  items-center
  cursor-pointer
`;
const CloseBtn = tw.button`
  absolute
  right-4
  top-4
`;
const CartIconBtn = tw(FontAwesomeIcon)`
  pr-1
  pt-2
  tablet:h-16
  mobile:h-12
`;
const Overlay = tw.div`
  absolute
  top-0
  right-0
  w-full
  h-screen
  bg-gray-dark
  opacity-50
  cursor-pointer
  z-1
`;

export default AddFoodSection;
