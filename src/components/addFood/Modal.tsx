import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { changeStrDate } from 'src/utils/changeStrDate';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeFoodInfo } from 'src/lib/slice/foodSlice';
import { addToShoppingBag } from 'src/lib/slice/shoppingBagSlice';
import { showFoodModal } from 'src/lib/slice/showFoodModalSlice';
import { showAddedFoodModal } from 'src/lib/slice/showAddedFoodModal';
import tw from 'tailwind-styled-components';

interface IModalProps {
  addedFoodModal?: boolean;
}

const Modal = ({ addedFoodModal }: IModalProps) => {
  const { food } = useAppSelector((state) => state.food);
  const { addedFood } = useAppSelector((state) => state.addedFood);
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);
  const dispatch = useAppDispatch();
  const foodInfo = addedFoodModal ? addedFood : food;

  const initialState = {
    type: '',
    name: '',
    space: 'shoppingBag',
    emoji: '1f34b',
    expiryDate: changeStrDate(new Date()),
    quantity: '',
  };

  const closeModal = () => {
    if (addedFoodModal) {
      dispatch(showAddedFoodModal());
    } else {
      dispatch(showFoodModal());
      dispatch(changeFoodInfo(initialState));
    }
  };

  const onAddFoodClick = () => {
    if (shoppingBagFoods.length >= 6) {
      alert('장바구니에 식료품을 6개 이상 넣을 수 없습니다.');
      dispatch(showFoodModal());
      return;
    }
    dispatch(showFoodModal());
    dispatch(changeFoodInfo(initialState));
    dispatch(addToShoppingBag([...shoppingBagFoods, food]));
  };

  return (
    <>
      <Overlay onClick={closeModal} $addedFoodModal={addedFoodModal} />
      <ModalBox $addedFoodModal={addedFoodModal}>
        <Title>
          {addedFoodModal ? '내 식료품 정보' : '추가하는 식료품 정보'}
        </Title>
        <EmojiBox>
          <Emoji
            unified={foodInfo.emoji}
            size={60}
            emojiStyle={EmojiStyle.APPLE}
          />
        </EmojiBox>
        <Info>
          <Item>
            <Name>카테고리</Name>
            {foodInfo.type}
          </Item>
          <Item>
            <Name>이름</Name>
            {foodInfo.name}
          </Item>
          <Item>
            <Name>수량</Name>
            {foodInfo.quantity}
          </Item>
          <Item>
            <Name>유통기한</Name>
            {new Date(foodInfo.expiryDate).toLocaleDateString()}
          </Item>
        </Info>
        {!addedFoodModal && (
          <Btns>
            <Btn onClick={onAddFoodClick}>
              <FontAwesomeIcon icon={icon({ name: 'plus', style: 'solid' })} />
              <span>추가하기</span>
            </Btn>
            <Btn onClick={closeModal} $color>
              <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} />
              <span>취소하기</span>
            </Btn>
          </Btns>
        )}
      </ModalBox>
    </>
  );
};

const Overlay = tw.div<{ $addedFoodModal: boolean }>`
  absolute
  ${(p: { $addedFoodModal: boolean }) =>
    p.$addedFoodModal ? '-top-12' : 'top-0'}
  right-0
  w-full
  h-screen
  bg-gray-dark
  opacity-50
  cursor-pointer
  z-10
`;
const ModalBox = tw.div<{ $addedFoodModal: boolean }>`
  flex
  flex-col
  items-center
  justify-between
  p-5
  absolute
  ${(p: { $addedFoodModal: boolean }) =>
    p.$addedFoodModal ? '-top-12' : 'top-0'}
  left-0
  right-0
  bottom-0
  m-auto
  bg-orange-light
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
