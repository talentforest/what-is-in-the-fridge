import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiceD6,
  faEdit,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { useHandleAddedFood } from 'src/hooks';
import { useAppSelector } from 'src/lib/hooks';
import tw from 'tailwind-styled-components';

interface IAddedFoodBtnsProps {
  setEdit: (edit: boolean) => void;
}

const AddedFoodBtns = ({ setEdit }: IAddedFoodBtnsProps) => {
  const { fridgeOpen } = useAppSelector((state) => state.doorOpen);
  const { removeAddedFood, moveToAnotherMode } = useHandleAddedFood();

  return (
    <Btns>
      <Btn $color='bg-green' onClick={setEdit}>
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
  );
};

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

export default AddedFoodBtns;
