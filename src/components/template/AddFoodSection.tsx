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
import tw from 'tailwind-styled-components';
import AddFoodForm from '../addFood/AddFoodForm';
import { screens } from 'src/utils/screen';
import useWindowSize from 'src/hooks/useWindowSize';

const CLOSE_X = -260;

const AddFoodSection = () => {
  const { modal } = useAppSelector((state) => state.foodModal);
  const { food } = useAppSelector((state) => state.food);
  const { windowSize } = useWindowSize();
  const { open, close } = useAppSelector((state) => state.addFoodArea);
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
    dispatch(openAddFoodArea());
    open
      ? slideXAnimation.start({ x: CLOSE_X })
      : slideXAnimation.start({ x: 0 });
  };

  const onDesktopClick = () => {
    close
      ? slideXAnimation.start({ x: 0 })
      : slideXAnimation.start({ x: CLOSE_X });
    dispatch(closeAddFoodArea());
  };

  return (
    <>
      {screens.tablet >= windowSize.width ? (
        <>
          <Menu onClick={onMobileClick}>
            <FontAwesomeIcon
              icon={faCartPlus}
              size='xl'
              color='#f9641f'
              style={{ cursor: 'pointer' }}
            />
          </Menu>
          {open && <Overlay onClick={onMobileClick} />}
          <AddFoodBox
            transition={{ type: 'linear', duration: 0.3 }}
            initial={{ x: CLOSE_X }}
            animate={slideXAnimation}
          >
            <AddFoodForm onSubmit={onSubmit} />
          </AddFoodBox>
        </>
      ) : (
        <>
          <AddFoodBox
            transition={{ type: 'linear', duration: 0.3 }}
            initial={close ? { x: -255 } : { x: 0 }}
            animate={slideXAnimation}
          >
            {close ? (
              <OpenAddFoodBtn onClick={onDesktopClick}>
                <FontAwesomeIcon
                  icon={faCircleArrowRight}
                  className='cursor-pointer'
                />
              </OpenAddFoodBtn>
            ) : (
              <OpenAddFoodBtn onClick={onDesktopClick}>
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className='cursor-pointer'
                />
              </OpenAddFoodBtn>
            )}
            <AddFoodForm onSubmit={onSubmit} />
          </AddFoodBox>
        </>
      )}
      {modal && <Modal />}
    </>
  );
};

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

const Menu = tw.ul`
  absolute
  top-3
  right-4

  flex
  justify-between
  items-center
  gap-5
  text-gray-dark
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
  tablet:rounded-none
  mobile:rounded-r-3xl
  z-5
`;

export default AddFoodSection;
