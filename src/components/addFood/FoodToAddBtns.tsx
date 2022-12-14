import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';
import tw from 'tailwind-styled-components';
import useAddFood from 'src/hooks/useAddFood';

const FoodToAddBtns = () => {
  const { closeFoodModal, onAddFoodClick } = useAddFood();
  return (
    <Btns>
      <Btn onClick={onAddFoodClick} $color='bg-green'>
        <FontAwesomeIcon icon={faPlus} />
        <BtnName>추가하기</BtnName>
      </Btn>
      <Btn onClick={closeFoodModal} $color='bg-red-light'>
        <FontAwesomeIcon icon={faXmark} />
        <BtnName>취소하기</BtnName>
      </Btn>
    </Btns>
  );
};

const Btns = tw.div`
  flex
  flex-row
  gap-1
`;
const Btn = tw.button`
  tablet:w-20
  mobile:w-24
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

export default FoodToAddBtns;
