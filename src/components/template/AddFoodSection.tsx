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
import tw from 'tailwind-styled-components';
import AddFoodForm from '../addFood/AddFoodForm';
import useWindowSize from 'src/hooks/useWindowSize';
import Search from '../addFood/Search';

const CLOSE_X = -260;

const AddFoodSection = () => {
  const { food } = useAppSelector((state) => state.food);
  const { modal } = useAppSelector((state) => state.foodModal);
  const { open, close } = useAppSelector((state) => state.addFoodArea);
  const { windowSize } = useWindowSize();
  const slideXAnimation = useAnimation();
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
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
      {screens.desktop >= windowSize.width ? (
        <>
          <PlusIconBox onClick={onMobileClick}>
            <PlusIcon icon={faCartPlus} color='#66a8ea' />
          </PlusIconBox>
          {open && <Overlay onClick={onMobileClick} />}
          <AddFoodBox
            transition={{ type: 'linear', duration: 0.3 }}
            initial={{ x: CLOSE_X }}
            animate={slideXAnimation}
          >
            <FormBox>
              <FormTitle>냉장실 식료품 추가하기</FormTitle>
              <Search />
              <AddFoodForm onSubmit={onSubmit} />
            </FormBox>
          </AddFoodBox>
        </>
      ) : (
        <AddFoodBox
          transition={{ type: 'linear', duration: 0.3 }}
          initial={close ? { x: -255 } : { x: 0 }}
          animate={slideXAnimation}
        >
          {close ? (
            <OpenAddFoodBtn onClick={onDesktopClick}>
              <Icon icon={faCircleArrowRight} />
            </OpenAddFoodBtn>
          ) : (
            <OpenAddFoodBtn onClick={onDesktopClick}>
              <Icon icon={faCircleXmark} />
            </OpenAddFoodBtn>
          )}
          <FormBox>
            <FormTitle>냉장실 식료품 추가하기</FormTitle>
          </FormBox>
          {/* <AddFoodForm onSubmit={onSubmit} /> */}
        </AddFoodBox>
      )}
      {modal && <Modal />}
    </>
  );
};

const FormBox = tw.div`
  z-5
  bg-orange-light
  w-64
  p-4
  rounded-r-3xl
  absolute
  top-0
  left-0
  h-full
  tablet:shadow-none
  mobile:shadow-3xl
`;

const FormTitle = tw.h2`
text-gray-dark
  font-bold
`;

const PlusIconBox = tw.button`
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
  gap-5
  text-gray-dark
`;
const Icon = tw(FontAwesomeIcon)`
  cursor-pointer
`;
const PlusIcon = tw(FontAwesomeIcon)`
  cursor-pointer
  tablet:w-20
  tablet:h-20
  mobile:w-12
  mobile:h-12
  pt-2
  pr-1.5
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
const OpenAddFoodBtn = tw(motion.button)`
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
  desktop:rounded-none
  mobile:rounded-r-3xl
  z-5
`;

export default AddFoodSection;
