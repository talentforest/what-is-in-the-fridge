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
  faCircleArrowRight,
  faCircleXmark,
} from '@fortawesome/free-solid-svg-icons';
import { screens } from 'src/utils/screen';
import { useEffect } from 'react';
import { getProductInfo } from 'src/pages/api/productInfo';
import { searchFood } from 'src/lib/slice/searchFood';
import tw from 'tailwind-styled-components';
import AddFoodForm from '../addFood/AddFoodForm';
import useWindowSize from 'src/hooks/useWindowSize';
import SearchResult from '../addFood/SearchResult';

const CLOSE_X = -260;

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
      {screens.desktop >= windowSize.width ? ( // 데스크탑보다 작은 기기
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
        // 데스크탑 이상 화면
        <AddFoodBox
          transition={{ type: 'linear', duration: 0.3, color: '#2d67d2' }}
          initial={close ? { x: CLOSE_X } : { x: 0 }}
          animate={slideXAnimation}
        >
          <OpenBtn onClick={onDesktopClick}>
            {close ? (
              <Icon icon={faCircleArrowRight} />
            ) : (
              <Icon icon={faCircleXmark} />
            )}
          </OpenBtn>
          <Title>냉장실 식료품 추가하기</Title>
          {!food.id ? <SearchResult /> : <AddFoodForm onSubmit={onSubmit} />}
        </AddFoodBox>
      )}
      {modal && <Modal />}
    </>
  );
};

const Title = tw.h2`
text-gray-dark
  font-bold
  mb-2
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
  mobile:bottom-2
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
const OpenBtn = tw(motion.button)`
  tablet:block
  mobile:hidden
  w-8
  h-full
  absolute
  top-0
  -right-8
  bg-yellow-light
  rounded-r-3xl
  z-5
`;
const AddFoodBox = tw(motion.section)`
  bg-orange-light
  shadow-3xl
  absolute
  top-0
  bottom-0
  w-64
  pt-5
  tablet:px-2
  mobile:px-4
  pb-5
  desktop:rounded-none
  mobile:rounded-r-3xl
  z-5
`;

export default AddFoodSection;
