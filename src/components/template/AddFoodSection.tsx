import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useAnimation } from 'framer-motion';
import { useAppSelector } from 'src/lib/hooks';
import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { screens } from 'src/utils/screens';
import { useWindowSize, useSubmitFood, useSlideAnimation } from 'src/hooks';
import Modal from '../fridgeFreezer/Modal';
import SearchResult from '../addFood/SearchResult';
import AddFoodForm from '../addFood/AddFoodForm';
import tw from 'tailwind-styled-components';
import TabBtns from '../addFood/TabBtns';
import BookmarkList from '../addFood/BookmarkList';
import AddModal from '../addFood/AddModal';

const AddFoodSection = () => {
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);
  const { tab } = useAppSelector((state) => state.tab);
  const { modal } = useAppSelector((state) => state.foodModal);
  const { open, close } = useAppSelector((state) => state.addFoodArea);
  const { windowSize } = useWindowSize();
  const { onSubmit } = useSubmitFood();
  const slideXAnimation = useAnimation();
  const { onMobileClick, onDesktopClick, CLOSE_X, MOBILE_CLOSE_X } =
    useSlideAnimation(slideXAnimation);

  return (
    <>
      {screens.tablet >= windowSize.width ? (
        <>
          <CartBtn onClick={onMobileClick}>
            <CartIconBtn icon={faCartPlus} color='#66a8ea' size='3x' />
          </CartBtn>
          {open && <Overlay onClick={onMobileClick} />}
          <AddFoodBox
            transition={{ type: 'linear', duration: 0.4 }}
            initial={{ x: MOBILE_CLOSE_X }}
            animate={slideXAnimation}
          >
            <TabBtns onDesktopClick={onDesktopClick} />
            {tab === 'search' && <SearchResult />}
            {tab === 'input' && <AddFoodForm />}
            {tab === 'bookmark' && <BookmarkList />}
          </AddFoodBox>
        </>
      ) : (
        <AddFoodBox
          transition={{ type: 'linear', duration: 0.4, color: '#2d67d2' }}
          initial={close ? { x: CLOSE_X } : { x: 0 }}
          animate={slideXAnimation}
        >
          <TabBtns onDesktopClick={onDesktopClick} />
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
  w-24
  h-24
  absolute
  bottom-4
  right-4
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
