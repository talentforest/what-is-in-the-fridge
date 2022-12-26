import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { foodInfoNames } from 'src/utils/foodCategory';
import { useEditFoodInfo, useAddFood } from 'src/hooks/index';
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addBookmark, changeFoodInfo, removeBookmark } from 'src/lib/slice';
import AddedFoodBtns from '../fridgeFreezer/AddedFoodBtns';
import FoodToAddBtns from '../addFood/FoodToAddBtns';
import Image from 'next/image';
import tw from 'tailwind-styled-components';

interface IModalProps {
  addedFoodModal?: boolean;
}

const Modal = ({ addedFoodModal }: IModalProps) => {
  const dispatch = useAppDispatch();
  const { food } = useAppSelector((state) => state.food);
  const { addedFood } = useAppSelector((state) => state.addedFood);
  const {
    edit,
    setEdit,
    closeAddedFoodModal,
    onEditSubmitClick,
    onBookMarkClick,
    nameRef,
    quantityRef,
    dateRef,
  } = useEditFoodInfo();
  const { closeFoodModal } = useAddFood();

  const bookmarkClick = () => {
    const result = { ...food, bookmark: !food.bookmark };
    dispatch(changeFoodInfo(result));
    const bookmarkInfo = {
      id: food.id,
      name: food.name,
      type: food.type,
      emoji: food.emoji,
      imgUrl: food.imgUrl,
      bookmark: food.bookmark,
    };
    !food.bookmark
      ? dispatch(addBookmark(bookmarkInfo))
      : dispatch(removeBookmark(bookmarkInfo));
  };

  const foodInfo = addedFoodModal ? addedFood : food;
  const closeModal = addedFoodModal ? closeAddedFoodModal : closeFoodModal;
  const changeBookmark = addedFoodModal ? onBookMarkClick : bookmarkClick;

  return (
    <>
      <Overlay onClick={closeModal} $addedFoodModal={addedFoodModal} />
      <ModalBox $addedFoodModal={addedFoodModal}>
        <Header>
          <Title>
            {addedFoodModal ? '내 식료품 정보' : '추가하는 식료품 정보'}
          </Title>
          <CloseBtn onClick={closeModal} $color='bg-red-light'>
            <FontAwesomeIcon icon={faXmark} size='lg' color='#333' />
          </CloseBtn>
        </Header>
        <Main>
          <EmojiBox>
            {!foodInfo.imgUrl ? (
              <Emoji
                unified={foodInfo.emoji}
                size={60}
                emojiStyle={EmojiStyle.APPLE}
              />
            ) : (
              <Img
                src={foodInfo.imgUrl}
                alt='Picture of Food'
                fill
                sizes='(max-width: 768px) 300px,
                (max-width: 1200px) 100px,
                30px'
                priority
              />
            )}
            <BookMark onClick={changeBookmark} $isBookMark={foodInfo.bookmark}>
              <FontAwesomeIcon
                icon={faStar}
                color={foodInfo.bookmark ? 'gold' : 'white'}
              />
            </BookMark>
          </EmojiBox>
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
            <Info>
              {Object.keys(foodInfoNames).map((name) => (
                <Item key={name}>
                  <Name>{foodInfoNames[name]}</Name>
                  <ItemInfo>{foodInfo[name]}</ItemInfo>
                </Item>
              ))}
            </Info>
          )}
        </Main>
        {!edit &&
          (addedFoodModal ? (
            <AddedFoodBtns setEdit={() => setEdit((prev) => !prev)} />
          ) : (
            <FoodToAddBtns />
          ))}
      </ModalBox>
    </>
  );
};

const BookMark = tw.button<{ $isBookMark: boolean }>`
  w-10
  h-10
  absolute
  -top-3
  -right-3
  rounded-full
  flex
  justify-center
  items-center
  bg-yello
  shadow-md
  ${(p: { $isBookMark: boolean }) =>
    p.$isBookMark ? 'bg-blue-dark' : 'bg-gray-light'} 
`;
const Overlay = tw.div`
  absolute
  mobile:${(p: { $addedFoodModal: boolean }) =>
    p.$addedFoodModal ? '-top-12' : 'top-0'}
  right-0
  left-0
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
  absolute
  ${(p: { $addedFoodModal: boolean }) =>
    p.$addedFoodModal ? '-top-12' : 'top-0'}
  left-0
  right-0
  bottom-0
  m-auto
  bg-yellow-light
  rounded-3xl
  z-10

  tablet:p-6
  mobile:p-4
  tablet:max-w-[450px]
  tablet:h-80
  mobile:w-3/4
  mobile:h-[400px]
`;
const Header = tw.header`
  w-full
  flex
  justify-between
  items-center
  mb-2
`;
const Title = tw.h2`
  font-bold
  mobile:text-[14px]
  tablet:text-base
`;
const CloseBtn = tw.button`
  cursor-pointer
`;
const Main = tw.div`
  flex
  mobile:flex-col
  tablet:flex-row
  items-center
  justify-evenly
  gap-4
  w-full
`;
const EmojiBox = tw.div`
  relative
  flex
  justify-center
  items-center
  h-28
  w-28
  rounded-lg
  shadow-lg
  bg-white
`;
const Img = tw(Image)`
  rounded-xl
  object-cover
  object-center
`;
const Info = tw.ul`
  flex
  flex-col
  mobile:gap-2
  tablet:gap-3
  mobile:w-52
  tablet:w-fit
  w-full
`;
const Item = tw.li`
  flex
  gap-3
  items-center
  justify-between
  mobile:text-[14px]
  tablet:text-base
`;
const Name = tw.div`
  tablet:w-16
  mobile:w-1/4
  text-gray
`;
const ItemInfo = tw.span` 
  tablet:text-start
  mobile:text-end
  break-keep
  w-2/3
`;
const Input = tw.input`
  text-start
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
