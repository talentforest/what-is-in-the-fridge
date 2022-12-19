import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { useAppSelector } from 'src/lib/hooks';
import { foodInfoNames } from 'src/utils/foodCategory';
import tw from 'tailwind-styled-components';
import useEditFoodInfo from 'src/hooks/useEditFoodInfo';
import AddedFoodBtns from '../fridgeFreezer/AddedFoodBtns';
import FoodToAddBtns from '../addFood/FoodToAddBtns';
import useAddFood from 'src/hooks/useAddFood';
import Image from 'next/image';

interface IModalProps {
  addedFoodModal?: boolean;
}

const Modal = ({ addedFoodModal }: IModalProps) => {
  const { food } = useAppSelector((state) => state.food);
  const { addedFood } = useAppSelector((state) => state.addedFood);
  const {
    edit,
    setEdit,
    closeAddedFoodModal,
    onEditSubmitClick,
    nameRef,
    quantityRef,
    dateRef,
  } = useEditFoodInfo();
  const { closeFoodModal } = useAddFood();

  const foodInfo = addedFoodModal ? addedFood : food;
  const closeModal = addedFoodModal ? closeAddedFoodModal : closeFoodModal;

  return (
    <>
      <Overlay onClick={closeModal} $addedFoodModal={addedFoodModal} />
      <ModalBox $addedFoodModal={addedFoodModal}>
        <Title>
          {addedFoodModal ? '내 식료품 정보' : '추가하는 식료품 정보'}
        </Title>
        {!foodInfo.imgUrl ? (
          <EmojiBox>
            <Emoji
              unified={foodInfo.emoji}
              size={60}
              emojiStyle={EmojiStyle.APPLE}
            />
          </EmojiBox>
        ) : (
          <EmojiBox>
            <Img
              src={foodInfo.imgUrl}
              alt='Picture of Food'
              fill
              sizes='(max-width: 768px) 300px,
                (max-width: 1200px) 100px,
                30px'
              priority
            />
          </EmojiBox>
        )}
        {edit ? (
          <Info>
            <Item>
              <Name>카테고리</Name>
              {foodInfo.type}
            </Item>
            <Item>
              <Name>이름</Name>
              <Input type='text' defaultValue={foodInfo.name} ref={nameRef} />
            </Item>
            <Item>
              <Name>수량</Name>
              <Input
                type='number'
                defaultValue={foodInfo.quantity}
                ref={quantityRef}
              />
            </Item>
            <Item>
              <Name>유통기한</Name>
              <Input
                type='date'
                defaultValue={foodInfo.expiryDate}
                ref={dateRef}
              />
            </Item>
            <SubmitBtn onClick={onEditSubmitClick}>수정완료</SubmitBtn>
          </Info>
        ) : (
          <>
            <Info>
              {Object.keys(foodInfoNames).map((name) => (
                <Item key={name}>
                  <Name>{foodInfoNames[name]}</Name>
                  <ItemInfo>{foodInfo[name]}</ItemInfo>
                </Item>
              ))}
            </Info>
            {addedFoodModal ? (
              <AddedFoodBtns setEdit={() => setEdit((prev) => !prev)} />
            ) : (
              <FoodToAddBtns />
            )}
          </>
        )}
      </ModalBox>
    </>
  );
};

const Overlay = tw.div`
  absolute
  mobile:${(p: { $addedFoodModal: boolean }) =>
    p.$addedFoodModal ? '-top-12' : 'top-0'}
  right-0
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
  ${(p: { $addedFoodModal: boolean }) =>
    p.$addedFoodModal ? '-top-12' : 'top-0'}
  left-0
  right-0
  bottom-0
  m-auto
  bg-orange-light
  tablet:w-96
  tablet:h-[450px]
  mobile:w-4/5
  mobile:h-2/3
  rounded-3xl
  shadow-red
  z-10
`;
const Title = tw.h3`
  font-bold
`;
const EmojiBox = tw.div`
  relative
  flex
  justify-center
  items-center
  h-28
  w-28
  my-4
  rounded-lg
  shadow-md
  bg-white
`;
const Img = tw(Image)`
  rounded-lg
  border
  object-cover
  object-center
`;
const Info = tw.ul`
  flex
  flex-col
  gap-2
  px-3
  w-56
`;
const Item = tw.li`
  flex
  gap-1
  items-center
  justify-between
  text-[14px]
`;
const Name = tw.div`
  w-16
  text-gray
`;
const ItemInfo = tw.span` 
  text-end
  break-keep
  w-36
`;
const Input = tw.input`
  text-end
  w-36
  rounded-lg
  px-2
  py-1
  shadow-lg
`;
const SubmitBtn = tw.button`
  mt-3
  p-2
  rounded-lg
  bg-green
  shadow-lg
  text-white
  font-semibold
`;

export default Modal;
