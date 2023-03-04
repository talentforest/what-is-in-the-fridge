import { Emoji } from 'emoji-picker-react';
import { useAppSelector } from 'src/lib/hooks';
import { useAddFood } from 'src/hooks';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { foodInfoNames } from 'src/utils/foodCategory';
import Image from 'next/image';
import tw from 'tailwind-styled-components';
import Overlay from '../common/Overlay';
import { ModalBox } from '../fridgeFreezer/Modal';
import CloseBtn from '../common/CloseBtn';

const AddModal = () => {
  const { food } = useAppSelector((state) => state.food);
  const { closeFoodModal, onAddFoodClick } = useAddFood();

  return (
    <>
      <Overlay closeModal={closeFoodModal} />
      <ModalBox>
        <Header>
          <Title>추가하는 식료품 정보</Title>
          <CloseBtn onCloseClick={closeFoodModal} />
        </Header>
        <Main>
          <ImgBox>
            {!food.imgUrl ? (
              <Emoji unified={food.emoji} size={60} />
            ) : (
              <Img
                src={food.imgUrl}
                alt={food.name}
                fill
                sizes='150px'
                priority
              />
            )}
          </ImgBox>
          <Info>
            {Object.keys(foodInfoNames).map((name) => (
              <Item key={name}>
                <Name>{foodInfoNames[name]}</Name>
                <ItemInfo>
                  {name === 'expiryDate'
                    ? new Date(food[name]).toLocaleDateString()
                    : food[name]}
                </ItemInfo>
              </Item>
            ))}
          </Info>
        </Main>
        <AddBtn onClick={onAddFoodClick}>
          <FontAwesomeIcon icon={faPlus} size='lg' />
          <span>추가하기</span>
        </AddBtn>
      </ModalBox>
    </>
  );
};

const Header = tw.header`
  w-full
  flex
  justify-between
  items-center
`;

const Title = tw.h2`
  font-bold
  text-[14px]
  tablet:text-base
`;

const Main = tw.div`
  border
  border-gray-light
  flex
  flex-col
  items-center
  justify-evenly
  gap-4
  py-2
  w-full
  h-full
  tablet:flex-row
  tablet:gap-8
  tablet:h-44
  rounded-lg
  bg-white
  p-2
`;

const ImgBox = tw.div`
  relative
  h-28
  w-28
  flex
  justify-center
  items-center
`;

const Img = tw(Image)`
  rounded-xl
  object-cover
  object-center
`;
const Info = tw.ul`
  w-full
  flex
  flex-col
  gap-2
  tablet:w-52  
  tablet:gap-3
`;

const Item = tw.li`
  flex
  gap-2
  items-center
  justify-between
  text-md
  tablet:gap-5
  tablet:text-base
`;

const Name = tw.div`
  w-14
  text-gray
  tablet:w-16
`;

const ItemInfo = tw.span` 
  text-end
  break-all
  w-fit
  max-w-[150px]
`;

const AddBtn = tw.button`
  w-full
  p-3
  flex
  justify-center
  items-center
  gap-2
  bg-blue-dark
  shadow-lg
  rounded-lg
  text-white
  text-base
  cursor-pointer
  tablet:w-36
  tablet:self-end
`;

export default AddModal;
