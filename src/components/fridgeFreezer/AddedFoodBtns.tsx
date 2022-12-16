import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDiceD6,
  faEdit,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import tw from 'tailwind-styled-components';
import useHandleAddedFood from 'src/hooks/useHandleAddedFood';
import { useAppSelector } from 'src/lib/hooks';

interface IAddedFoodBtnsProps {
  setEdit: (edit: boolean) => void;
}

const AddedFoodBtns = ({ setEdit }: IAddedFoodBtnsProps) => {
  const { freezerMode } = useAppSelector((state) => state.freezerMode);
  const { removeAddedFood, moveToAnotherMode } = useHandleAddedFood();

  return (
    <Btns>
      <Btn $color='bg-green' onClick={setEdit}>
        <FontAwesomeIcon icon={faEdit} size='2x' />
        <BtnName>
          식료품
          <br />
          정보 수정
        </BtnName>
      </Btn>
      <Btn $color='bg-red-light' onClick={removeAddedFood}>
        <FontAwesomeIcon icon={faTrashCan} size='2x' />
        <BtnName>
          {freezerMode ? (
            <>
              냉동실에서
              <br />
              삭제
            </>
          ) : (
            <>
              냉장실에서
              <br />
              삭제
            </>
          )}
        </BtnName>
      </Btn>
      <Btn $color='bg-blue' onClick={moveToAnotherMode}>
        <FontAwesomeIcon icon={faDiceD6} size='2x' />
        <BtnName>
          {freezerMode ? (
            <>
              냉장실로
              <br />
              옮기기
            </>
          ) : (
            <>
              냉동실로
              <br />
              옮기기
            </>
          )}
        </BtnName>
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
  w-20
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
  text-[10px]
  font-semibold
`;
const BtnName = tw.span`
  leading-3
`;

export default AddedFoodBtns;