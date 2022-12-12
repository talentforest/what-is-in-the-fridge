import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import tw from 'tailwind-styled-components';
import useAddFood from 'src/hooks/useAddFood';

const FoodToAddBtns = () => {
  const { closeFoodModal, onAddFoodClick } = useAddFood();
  return (
    <Btns>
      <Btn onClick={onAddFoodClick} $color='bg-green'>
        <FontAwesomeIcon icon={icon({ name: 'plus', style: 'solid' })} />
        <BtnName>추가하기</BtnName>
      </Btn>
      <Btn onClick={closeFoodModal} $color='bg-red-light'>
        <FontAwesomeIcon icon={icon({ name: 'xmark', style: 'solid' })} />
        <BtnName>취소하기</BtnName>
      </Btn>
    </Btns>
  );
};

const Btns = tw.div`
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
const SubmitBtn = tw.button`
  mt-3
  text-xs
  p-2
  rounded-lg
  bg-green
  shadow-lg
  text-white
  font-semibold
`;

export default FoodToAddBtns;
