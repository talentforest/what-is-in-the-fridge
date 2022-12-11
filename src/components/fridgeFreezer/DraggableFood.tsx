import { Emoji } from 'emoji-picker-react';
import { useDrag } from 'react-dnd';
import { IFood } from '../template/AddFoodSection';
import { removeShoppingBagFood } from 'src/lib/slice/shoppingBagSlice';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import styled from 'styled-components';
import useDragFridgeItem from 'src/hooks/useDragFridgeItem';

interface IFoodProps {
  food: IFood;
}

interface DropResult {
  name: string;
}

const DraggableFood = ({ food }: IFoodProps) => {
  const { freezerMode } = useAppSelector((state) => state.freezerMode);
  const { changeFridgeState } = useDragFridgeItem();
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'spaces',
    item: food,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        !freezerMode && changeFridgeState(dropResult.name, item);
        dispatch(removeShoppingBagFood(item));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  });

  return (
    <DragBox
      ref={dragRef}
      style={{
        opacity: isDragging ? 0.2 : 1,
      }}
    >
      <Emoji unified={food.emoji} size={30} />
    </DragBox>
  );
};

const DragBox = styled.button`
  height: fit-content;
  transform: translate(0, 0);
`;

export default DraggableFood;
