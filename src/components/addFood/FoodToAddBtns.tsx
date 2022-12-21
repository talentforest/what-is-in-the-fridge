import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import tw from 'tailwind-styled-components';
import useAddFood from 'src/hooks/useAddFood';

const FoodToAddBtns = () => {
  const { onAddFoodClick } = useAddFood();

  return (
    <Btn onClick={onAddFoodClick} $color='bg-green'>
      <FontAwesomeIcon icon={faPlus} size='lg' />
      <span>추가하기</span>
    </Btn>
  );
};

const Btn = tw.button`
  w-fit
  px-6
  py-3
  flex
  items-center
  gap-2
  ${(p: { $color: boolean }) => p.$color}
  cursor-pointer
  shadow-lg
  rounded-3xl
  text-white
  text-[14px]
  font-semibold
`;

export default FoodToAddBtns;
