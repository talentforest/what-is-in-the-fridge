import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiceD6,
  faEdit,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import tw from 'tailwind-styled-components';
import { useHandleAddedFood } from 'src/hooks/index';

interface IAddedFoodBtnsProps {
  setEdit: (edit: boolean) => void;
}

const AddedFoodBtns = ({ setEdit }: IAddedFoodBtnsProps) => {
  const { removeAddedFood, moveToAnotherMode } = useHandleAddedFood();

  return (
    <Btns>
      <Btn $color='bg-green' onClick={setEdit}>
        <FontAwesomeIcon icon={faEdit} size='xl' />
        <BtnName>수정</BtnName>
      </Btn>
      <Btn $color='bg-red-light' onClick={removeAddedFood}>
        <FontAwesomeIcon icon={faTrashCan} size='xl' />
        <BtnName>삭제</BtnName>
      </Btn>
      <Btn $color='bg-blue' onClick={moveToAnotherMode}>
        <FontAwesomeIcon icon={faDiceD6} size='xl' />
        <BtnName>옮기기</BtnName>
      </Btn>
    </Btns>
  );
};

const Btns = tw.div`
  mt-3
  flex
  ${(p: { $addedFoodModal: boolean }) =>
    p.$addedFoodModal ? 'flex-col' : 'flex-row'}
  gap-1
`;
const Btn = tw.button`
  w-16
  flex
  flex-col
  gap-2
  ${(p: { $color: boolean }) => p.$color}
  cursor-pointer
  shadow-lg
  rounded-lg
  p-2
  items-center
  text-white
  mobile:text-[12px]
  tablet:text-[14px]
`;
const BtnName = tw.span`
  leading-3
`;

export default AddedFoodBtns;
