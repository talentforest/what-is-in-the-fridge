import { Emoji } from 'emoji-picker-react';
import { foodInfoNames } from 'src/utils/foodCategory';
import {
  useAddFood,
  useEditFood,
  useHandleAddedFood,
  useHandleBookmark,
} from 'src/hooks';
import {
  faDiceD6,
  faEdit,
  faPlus,
  faStar,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppSelector } from 'src/lib/hooks';
import { IFood, ISearchedFood } from 'src/lib/slice/newFoodSlice';
import Image from 'next/image';
import Overlay from './Overlay';
import CloseBtn from './CloseBtn';
import tw from 'tailwind-styled-components';

interface IModalProps {
  food: IFood | ISearchedFood;
}

const Modal = ({ food }: IModalProps) => {
  const { fridgeOpen } = useAppSelector((state) => state.doorOpen);
  const { removeAddedFood, moveToAnotherMode } = useHandleAddedFood();
  const { onAddFoodClick, closeFoodToAddModal } = useAddFood();
  const { onBookmarkClick } = useHandleBookmark();
  const { storedFoodModal, newFoodModal } = useAppSelector(
    (state) => state.modal
  );
  const {
    editing,
    setEditing,
    closeAddedFoodModal,
    onEditSubmitClick,
    nameRef,
    quantityRef,
    dateRef,
  } = useEditFood();

  const onCloseClick = () => {
    return newFoodModal ? closeFoodToAddModal : closeAddedFoodModal;
  };

  return (
    <>
      <Overlay closeModal={onCloseClick()} />
      <ModalBox>
        <Header>
          <Title>식료품 정보</Title>
          <CloseBtn onCloseClick={onCloseClick()} />
        </Header>
        <Main>
          <div className='relative flex justify-center items-center h-28 w-28 rounded-lg shadow-lg bg-white'>
            {!food?.imgUrl ? (
              <Emoji unified={food?.emoji} size={60} />
            ) : (
              <Image
                src={`${food?.imgUrl}`}
                alt={food?.name}
                width={300}
                height={300}
                className='h-24 w-24 object-cover rounded-md shadow-lg'
                unoptimized
              />
            )}
            {!editing && storedFoodModal && (
              <Bookmark onClick={onBookmarkClick} $isBookmark={food.bookmark}>
                <FontAwesomeIcon
                  icon={faStar}
                  color={food?.bookmark ? 'gold' : 'white'}
                />
              </Bookmark>
            )}
          </div>
          {!editing ? (
            <InfoList>
              {Object.keys(foodInfoNames).map((name) => (
                <Item key={name}>
                  <Name>{foodInfoNames[name]}</Name>
                  <Info>
                    {name === 'expiryDate'
                      ? new Date(food[name]).toLocaleDateString()
                      : food[name]}
                  </Info>
                </Item>
              ))}
            </InfoList>
          ) : (
            <Form>
              <Item>
                <Name>카테고리</Name>
                {food.type}
              </Item>
              <Item>
                <Name>이름</Name>
                <Input type='text' defaultValue={food.name} ref={nameRef} />
              </Item>
              <Item>
                <Name>수량</Name>
                <Input
                  type='number'
                  defaultValue={food.quantity}
                  ref={quantityRef}
                />
              </Item>
              <Item>
                <Name>유통기한</Name>
                <Input
                  type='date'
                  defaultValue={food.expiryDate}
                  ref={dateRef}
                />
              </Item>
              <SubmitBtn onClick={onEditSubmitClick}>수정완료</SubmitBtn>
            </Form>
          )}
        </Main>
        {!editing && storedFoodModal && (
          <Btns>
            <Btn $color='bg-green' onClick={() => setEditing((prev) => !prev)}>
              <FontAwesomeIcon icon={faEdit} size='lg' />
              <span>수정</span>
            </Btn>
            <Btn $color='bg-red-light' onClick={removeAddedFood}>
              <FontAwesomeIcon icon={faTrashCan} size='lg' />
              <span>삭제</span>
            </Btn>
            <Btn $color='bg-blue' onClick={moveToAnotherMode}>
              <FontAwesomeIcon icon={faDiceD6} size='lg' />
              <span>{fridgeOpen ? '냉동실' : '냉장실'}로</span>
            </Btn>
          </Btns>
        )}
        {newFoodModal && (
          <AddBtn onClick={onAddFoodClick}>
            <FontAwesomeIcon icon={faPlus} size='lg' />
            <span>추가하기</span>
          </AddBtn>
        )}
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
  w-3/5
  max-w-[300px]
  h-3/5
  min-h-[400px]
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

const Bookmark = tw.button<{ $isBookmark: boolean }>`
  absolute
  bottom-0
  -right-4
  h-8
  w-8
  flex
  justify-center
  items-center
  rounded-full
  shadow-md
  bg-yellow
  ${(p: { $isBookmark: boolean }) =>
    p.$isBookmark ? 'bg-blue-dark' : 'bg-gray-light'} 
`;

const InfoList = tw.ul`
  flex
  flex-col
  gap-2
  w-full
  tablet:w-56
  tablet:gap-3
`;

const Form = tw.form`
  flex
  flex-col
  gap-2
  w-full
  tablet:gap-3
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

const Info = tw.span` 
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
  font-bold
  text-base
  text-white
  bg-green
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

const Btns = tw.div`
  w-full
  tablet:px-4
  mt-3
  flex
  justify-between
  gap-2
`;

const Btn = tw.button`
  w-full
  h-14
  flex
  tablet:flex-row
  flex-col
  justify-center
  items-center
  gap-1
  text-sm
  ${(p: { $color: boolean }) => p.$color}
  cursor-pointer
  shadow-lg
  rounded-lg
  py-2
  px-0.5
  text-white
  tablet:text-base
  tablet:gap-2
`;

export default Modal;
