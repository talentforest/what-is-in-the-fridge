import { Emoji } from 'emoji-picker-react';
import { useDrag } from 'react-dnd';
import { removeShoppingBagFood } from 'src/lib/slice/shoppingBagSlice';
import { useAppDispatch } from 'src/lib/hooks';
import { showFoodModal } from 'src/lib/slice/showFoodModalSlice';
import { changeFoodInfo, IFood } from 'src/lib/slice/foodSlice';
import styled from 'styled-components';
import useDragItem from 'src/hooks/useDragItem';
import tw from 'tailwind-styled-components';

interface IFoodProps {
  food: IFood;
}

interface DropResult {
  name: string;
}

const DraggableFood = ({ food }: IFoodProps) => {
  const { changeFoodsState } = useDragItem();
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'spaces',
    item: food,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        changeFoodsState(dropResult.name, item);
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
    console.log(food);
    dispatch(changeFoodInfo(food));
    dispatch(showFoodModal());
  };

  return (
    <DragBox ref={dragRef} style={isDraggingStyle} onClick={onClick}>
      <Emoji unified={food.emoji} size={30} />
    </DragBox>
  );
};

const DragBox = styled.button`
  position: relative;
  height: fit-content;
  transform: translate(0, 0);
`;

export default DraggableFood;
