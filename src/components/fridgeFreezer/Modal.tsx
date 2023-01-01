import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { useAppSelector } from 'src/lib/hooks';
import { foodInfoNames } from 'src/utils/foodCategory';
import { useEditFood, useHandleBookmark } from 'src/hooks';
import { faStar, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddedFoodBtns from './AddedFoodBtns';
import Image from 'next/image';
import tw from 'tailwind-styled-components';

const Modal = () => {
  const { addedFood } = useAppSelector((state) => state.addedFood);
  const {
    edit,
    setEdit,
    closeAddedFoodModal,
    onEditSubmitClick,
    nameRef,
    quantityRef,
    dateRef,
  } = useEditFood();
  const { onBookmarkClick } = useHandleBookmark();

  return (
    <>
      <Overlay onClick={closeAddedFoodModal} />
      <ModalBox>
        <Header>
          <Title>내 식료품 정보</Title>
          <CloseBtn onClick={closeAddedFoodModal} $color='bg-red-light'>
            <FontAwesomeIcon icon={faXmark} size='lg' color='#333' />
          </CloseBtn>
        </Header>
        <Main>
          <ImgBox>
            {!addedFood.imgUrl ? (
              <Emoji
                unified={addedFood.emoji}
                size={60}
                emojiStyle={EmojiStyle.APPLE}
              />
            ) : (
              <Img
                src={addedFood.imgUrl}
                alt={addedFood.name}
                fill
                sizes='(max-width: 768px) 300px,
                (max-width: 1200px) 100px,
                30px'
                priority
              />
            )}
            {!edit && (
              <Bookmark
                onClick={onBookmarkClick}
                $isBookmark={addedFood.bookmark}
              >
                <FontAwesomeIcon
                  icon={faStar}
                  color={addedFood.bookmark ? 'gold' : 'white'}
                />
              </Bookmark>
            )}
          </ImgBox>
          {edit ? (
            <Info>
              <Item>
                <Name>카테고리</Name>
                {addedFood.type}
              </Item>
              <Item>
                <Name>이름</Name>
                <Input
                  type='text'
                  defaultValue={addedFood.name}
                  ref={nameRef}
                />
              </Item>
              <Item>
                <Name>수량</Name>
                <Input
                  type='number'
                  defaultValue={addedFood.quantity}
                  ref={quantityRef}
                />
              </Item>
              <Item>
                <Name>유통기한</Name>
                <Input
                  type='date'
                  defaultValue={addedFood.expiryDate}
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
                    <ItemInfo>{addedFood[name]}</ItemInfo>
                  </Item>
                ))}
              </Info>
            </>
          )}
        </Main>
        {!edit && <AddedFoodBtns setEdit={() => setEdit((prev) => !prev)} />}
      </ModalBox>
    </>
  );
};

const Overlay = tw.div`
  absolute
  -top-12
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
  -top-12
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
  w-full
  h-full
  flex
  mobile:flex-col
  tablet:flex-row
  items-center
  justify-center
  tablet:gap-10
  mobile:gap-3
  tablet:px-4
`;
const ImgBox = tw.div`
  relative
  flex
  justify-center
  items-center
  h-28
  w-28
  rounded-lg
  shadow-lg
  bg-white
  mb-2
`;
const Bookmark = tw.button<{ $isBookmark: boolean }>`
  w-8
  h-8
  absolute
  bottom-0
  -right-4
  rounded-full
  flex
  justify-center
  items-center
  bg-yellow
  shadow-md
  ${(p: { $isBookmark: boolean }) =>
    p.$isBookmark ? 'bg-blue-dark' : 'bg-gray-light'} 
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
  mobile:w-full
  tablet:w-56
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
  mobile:w-14
  text-gray
`;
const ItemInfo = tw.span` 
  text-end
  break-all
  w-fit
  max-w-[150px]
`;
const Input = tw.input`
  w-36
  rounded-lg
  px-2
  py-1
  shadow-lg
  text-end
`;
const SubmitBtn = tw.button`
  mt-3
  p-2
  h-10
  rounded-lg
  bg-green
  shadow-lg
  text-white
  tablet:text-base
  mobile:text-[12px]
`;

export default Modal;
