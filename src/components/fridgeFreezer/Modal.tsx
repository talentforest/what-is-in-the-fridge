import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { useAppSelector } from 'src/lib/hooks';
import { foodInfoNames } from 'src/utils/foodCategory';
import { useEditFood, useHandleBookmark } from 'src/hooks';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddedFoodBtns from './AddedFoodBtns';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import Overlay from '../common/Overlay';
import CloseBtn from '../common/CloseBtn';

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
      <Overlay closeModal={closeAddedFoodModal} />
      <ModalBox>
        <Header>
          <Title>내 식료품 정보</Title>
          <CloseBtn onCloseClick={closeAddedFoodModal} />
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
                sizes='150px'
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
            <Info>
              {Object.keys(foodInfoNames).map((name) => (
                <Item key={name}>
                  <Name>{foodInfoNames[name]}</Name>
                  <ItemInfo>
                    {name === 'expiryDate'
                      ? new Date(addedFood[name]).toLocaleDateString()
                      : addedFood[name]}
                  </ItemInfo>
                </Item>
              ))}
            </Info>
          )}
        </Main>
        {!edit && <AddedFoodBtns setEdit={() => setEdit((prev) => !prev)} />}
      </ModalBox>
    </>
  );
};

export const ModalBox = tw.div`
  z-30
  absolute
  top-0
  left-0
  right-0
  bottom-0
  m-auto
  w-4/5
  h-fit
  p-4
  flex
  flex-col
  items-center
  justify-between
  gap-2
  rounded-xl
  shadow-2xl
  bg-blue-light
  tablet:p-6
  tablet:max-w-[450px]
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
`;

const Main = tw.div`
  w-full
  h-full
  flex
  flex-col
  items-center
  justify-center
  gap-5
  tablet:flex-row
  tablet:justify-between
  tablet:gap-3
`;

const ImgBox = tw.div`
  relative
  flex
  justify-center
  items-center
  h-32
  w-32
  rounded-lg
  shadow-lg
  bg-white
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
  gap-1
  items-center
  justify-between
  text-base
`;

const Name = tw.div`
  w-16
  text-gray
  tablet:w-16
`;

const ItemInfo = tw.span` 
  text-end
  break-all
  w-[70%]
  max-w-[150px]
`;

const Input = tw.input`
  w-3/5
  p-2
  rounded-lg
  shadow-md
  text-end
  appearance-none
  bg-white
`;

const SubmitBtn = tw.button`
  mt-3
  py-3
  rounded-lg
  shadow-lg
  bg-green
  text-white
  text-base
  font-bold
`;

export default Modal;
