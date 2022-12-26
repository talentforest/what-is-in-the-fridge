import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiceD6,
  faEdit,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { useHandleAddedFood } from 'src/hooks/index';
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
        <FontAwesomeIcon icon={faEdit} />
        <BtnName>수정</BtnName>
      </Btn>
      <Btn $color='bg-red-light' onClick={removeAddedFood}>
        <FontAwesomeIcon icon={faTrashCan} />
        <BtnName>삭제</BtnName>
      </Btn>
      <Btn $color='bg-blue' onClick={moveToAnotherMode}>
        <FontAwesomeIcon icon={faDiceD6} />
        <BtnName>{fridgeOpen ? '냉동실' : '냉장실'}로</BtnName>
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
  mobile:flex-col
  justify-center
  gap-2
  ${(p: { $color: boolean }) => p.$color}
  cursor-pointer
  shadow-lg
  rounded-lg
  py-3
  px-0.5
  items-center
  text-white
  tablet:text-base
  mobile:text-[12px]
`;
const BtnName = tw.span`
  leading-5
`;

export default AddedFoodBtns;
