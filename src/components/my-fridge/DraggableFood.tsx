import { Emoji } from 'emoji-picker-react';
import { useDrag } from 'react-dnd';
import {
  removeShoppingBagFood,
  changeStoredFood,
  toggleStoredFoodModal,
} from 'src/lib/slice/index';
import { useAppDispatch } from 'src/lib/hooks';
import { IFood, ISearchedFood, spaceName } from 'src/lib/slice/newFoodSlice';
import { useDragFood } from 'src/hooks';
import { getLeftDays } from 'src/utils/dateUtils';
import Image from 'next/image';
import tw from 'tailwind-styled-components';

interface IFoodProps {
  food: IFood | ISearchedFood;
  type: 'inner' | 'door' | 'shoppingBag';
}

interface DropResult {
  name: string;
}

const DraggableFood = ({ food, type }: IFoodProps) => {
  const { changeFoodsState } = useDragFood();
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'spaces',
    item: food,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        changeFoodsState(dropResult.name as spaceName, item);
        dispatch(removeShoppingBagFood(item));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  });
  const isDraggingStyle = { opacity: isDragging ? 0.2 : 1 };

  const onClick = () => {
    if (food.space === 'shoppingBag') return;
    dispatch(toggleStoredFoodModal());
    dispatch(changeStoredFood(food));
  };

  return (
    <DragBox
      $reversal={type === 'door'}
      ref={dragRef}
      style={isDraggingStyle}
      onClick={onClick}
    >
      <CoverBox />
      <ExpiryDateAlert $leftDays={getLeftDays(food.expiryDate)} />
      {food.imgUrl ? (
        <Image
          src={`${food.imgUrl}`}
          alt={food.name}
          width={50}
          height={50}
          className='h-8 w-8 object-cover rounded-md shadow-md'
          unoptimized
        />
      ) : (
        <Emoji unified={food.emoji} size={30} />
      )}
    </DragBox>
  );
};

const DragBox = tw.button<{ $reversal: boolean }>`
  relative
  h-fit
  translate-x-0
  translate-y-0
  ${(p: { $reversal: boolean }) => (p.$reversal ? 'scale-x-[-1]' : '')}
`;

const ExpiryDateAlert = tw.div<{ $leftDays: number }>`
  ${(p: { $leftDays: number }) =>
    p.$leftDays < 0
      ? 'bg-red'
      : p.$leftDays <= 3
      ? 'bg-orange'
      : p.$leftDays <= 7
      ? 'bg-yellow'
      : 'transparent'}
  absolute
  -top-1.5
  right-0
  h-1.5
  w-1.5
  rounded-full
`;

const CoverBox = tw.div`
  absolute
  w-full
  h-full
  z-10
  transparent
  translate-x-0
  translate-y-0
  flex
  justify-center
  items-center
`;

export default DraggableFood;
