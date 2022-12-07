import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { changeStrDate } from 'src/utils/changeStrDate';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { showFoodModal } from 'src/lib/slice/showFoodModalSlice';
import { changeFoodInfo } from 'src/lib/slice/foodSlice';
import { addToShoppingBag } from 'src/lib/slice/shoppingBagSlice';
import tw from 'tailwind-styled-components';

const Modal = () => {
  const { food } = useAppSelector((state) => state.food);
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);
  const dispatch = useAppDispatch();

  const onAddClick = () => {
    if (shoppingBagFoods.length >= 6) {
      alert('장바구니에 식료품을 6개 이상 넣을 수 없습니다.');
      dispatch(showFoodModal());
      return;
    }
    alert('성공적으로 등록되었습니다!');
    dispatch(showFoodModal());
    const initialState = {
      type: '',
      name: '',
      emoji: '1f34b',
      expiryDate: changeStrDate(new Date()),
      quantity: '',
    };
    dispatch(addToShoppingBag([...shoppingBagFoods, food]));
    dispatch(changeFoodInfo(initialState));
  };

  const closeModal = () => {
    dispatch(showFoodModal());
  };

  return (
    <>
      <Overlay onClick={closeModal} />
      <ModalBox>
        <Title>추가하는 식료품 정보</Title>
        <EmojiBox>
          <Emoji unified={food.emoji} size={60} emojiStyle={EmojiStyle.APPLE} />
        </EmojiBox>
        <Info>
          <Item>
            <Name>카테고리</Name>
            {food.type}
          </Item>
          <Item>
            <Name>이름</Name>
            {food.name}
          </Item>
          <Item>
            <Name>수량</Name>
            {food.quantity}
          </Item>
          <Item>
            <Name>유통기한</Name>
            {new Date(food.expiryDate).toLocaleDateString()}
          </Item>
        </Info>
        <Btns>
          <Btn onClick={onAddClick}>
            <FontAwesomeIcon icon={icon({ name: 'plus', style: 'solid' })} />
            <span>추가하기</span>
          </Btn>
          <Btn onClick={closeModal} $color>
            <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} />
            <span>취소하기</span>
          </Btn>
        </Btns>
      </ModalBox>
    </>
  );
};

const Overlay = tw.div`
  absolute
  top-0
  w-full
  h-screen
  bg-gray-dark
  opacity-50
  cursor-pointer
  z-10
`;
const ModalBox = tw.div`
  flex
  flex-col
  items-center
  justify-between
  p-5
  absolute
  top-0
  left-0
  right-0
  bottom-0
  m-auto
  bg-yellow-light
  w-80
  h-fit
  rounded-3xl
  shadow-red
  z-10
`;
const Title = tw.h3`
  font-bold
`;
const EmojiBox = tw.div`
  flex
  justify-center
  items-center
  border
  h-28
  w-28
  mt-4
  rounded-lg
  shadow-md
  bg-white
`;
const Info = tw.ul`
  flex
  flex-col
  gap-1
  py-3
  px-5
  my-2
  text-sm
`;
const Item = tw.li`
  flex
  gap-8
`;
const Name = tw.div`
  w-20
  text-gray
`;
const Btns = tw.div`
  flex
  justify-between
  gap-3
  mt-4
`;
const Btn = tw.button`
  ${(p: { $color: boolean }) => (p.$color ? 'bg-red-light' : 'bg-green')}
  cursor-pointer
  shadow-md
  rounded-md
  py-2
  px-3
  flex
  gap-2
  justify-between
  items-center
  text-white
  text-sm
  font-bold
`;
export default Modal;
