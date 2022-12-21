import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useAnimation } from 'framer-motion';
import {
  closeAddFoodArea,
  openAddFoodArea,
} from 'src/lib/slice/openCloseState/addFoodAreaSlice';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { showFoodModal } from 'src/lib/slice/openCloseState/showFoodModalSlice';
import Modal from '../common/Modal';
import {
  faCartPlus,
  faCircleArrowLeft,
  faCircleArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { screens } from 'src/utils/screen';
import { useEffect } from 'react';
import { getProductInfo } from 'src/pages/api/productInfo';
import { searchFood } from 'src/lib/slice/searchFood';
import tw from 'tailwind-styled-components';
import AddFoodForm from '../addFood/AddFoodForm';
import useWindowSize from 'src/hooks/useWindowSize';
import SearchResult from '../addFood/SearchResult';

const CLOSE_X = -290;

const AddFoodSection = () => {
  const { food } = useAppSelector((state) => state.food);
  const { modal } = useAppSelector((state) => state.foodModal);
  const { open, close } = useAppSelector((state) => state.addFoodArea);
  const { windowSize } = useWindowSize();
  const slideXAnimation = useAnimation();
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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (food.name.length === 0) return alert('식료품 이름을 적어주세요.');
    if (food.type.length === 0) return alert('식료품 카테고리를 적어주세요.');
    if (food.expiryDate.length === 0)
      return alert('식료품 유통기한을 적어주세요.');
    if (food.quantity.length === 0) return alert('식료품 개수를 적어주세요.');
    return dispatch(showFoodModal());
  };

  const onMobileClick = () => {
    open
      ? slideXAnimation.start({ x: CLOSE_X })
      : slideXAnimation.start({ x: 0 });
    dispatch(openAddFoodArea());
  };

  const onDesktopClick = () => {
    close
      ? slideXAnimation.start({ x: 0 })
      : slideXAnimation.start({ x: CLOSE_X });
    dispatch(closeAddFoodArea());
  };

  return (
    <>
      {screens.tablet >= windowSize.width ? ( // 태블릿보다 작은 기기
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
        // 태블릿 이상 화면
        <AddFoodBox
          transition={{ type: 'linear', duration: 0.3, color: '#2d67d2' }}
          initial={close ? { x: CLOSE_X } : { x: 0 }}
          animate={slideXAnimation}
        >
          <OpenBarBtn onClick={onDesktopClick}>
            {close ? (
              <Icon icon={faCircleArrowRight} size='lg' />
            ) : (
              <Icon icon={faCircleArrowLeft} size='lg' />
            )}
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
