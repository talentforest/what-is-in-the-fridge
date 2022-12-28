import { Emoji } from 'emoji-picker-react';
import { useAppSelector } from 'src/lib/hooks';
import { useAddFood } from 'src/hooks/index';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { foodInfoNames } from 'src/utils/foodCategory';
import Image from 'next/image';
import tw from 'tailwind-styled-components';

const AddModal = () => {
  const { food } = useAppSelector((state) => state.food);
  const { closeFoodModal, onAddFoodClick } = useAddFood();

  return (
    <>
      <Overlay onClick={closeFoodModal} />
      <ModalBox>
        <Header>
          <Title>추가하는 식료품 정보</Title>
          <CloseBtn onClick={closeFoodModal} $color='bg-red-light'>
            <FontAwesomeIcon icon={faXmark} size='lg' color='#333' />
          </CloseBtn>
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
                sizes='(max-width: 768px) 300px,
                (max-width: 1200px) 100px,
                30px'
                priority
              />
            )}
          </ImgBox>
          <Info>
            {Object.keys(foodInfoNames).map((name) => (
              <Item key={name}>
                <Name>{foodInfoNames[name]}</Name>
                <ItemInfo>{food[name]}</ItemInfo>
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

const Overlay = tw.div`
  absolute
  mobile:top-0
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
  gap-3
  absolute
  top-0
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
  border
  border-gray-light
  flex
  mobile:flex-col
  tablet:flex-row
  items-center
  justify-evenly
  mobile:gap-4
  tablet:gap-8
  py-2
  mobile:w-full
  tablet:w-full
  tablet:h-44
  mobile:h-full
  rounded-lg
  bg-white
  p-2
`;
const ImgBox = tw.div`
  relative
  flex
  justify-center
  items-center
  h-28
  w-28
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
  tablet:w-52  
`;
const Item = tw.li`
  flex
  tablet:gap-5
  mobile:gap-2
  items-center
  justify-between
  mobile:text-md
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
const AddBtn = tw.button`
  tablet:w-36
  mobile:w-full
  p-3
  flex
  tablet:self-end
  mobile:justify-center
  items-center
  gap-2
  bg-blue-dark
  shadow-lg
  rounded-lg
  text-white
  text-base
  cursor-pointer
`;

export default AddModal;
