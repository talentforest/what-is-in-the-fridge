import { Emoji } from 'emoji-picker-react';
import { useDrag } from 'react-dnd';
import { IFood } from '../template/AddFoodSection';
import {
  changeDoorFoods,
  changeInnerFoods,
} from 'src/lib/slice/fridgeFoodsSlice';
import { removeShoppingBagFood } from 'src/lib/slice/shoppingBagSlice';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import styled from 'styled-components';
import {
  changeFreezerDoorFoods,
  changeFreezerInnerFoods,
} from 'src/lib/slice/freezerFoodsSlice';

interface IFoodProps {
  food: IFood;
}

interface DropResult {
  name: string;
}

const DraggableFood = ({ food }: IFoodProps) => {
  const { freezerMode } = useAppSelector((state) => state.freezerMode);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const dispatch = useAppDispatch();

  const changeFridgeState = (spaceKey: string, item: IFood) => {
    const doorSpace =
      spaceKey === 'space_5' ||
      spaceKey === 'space_6' ||
      spaceKey === 'space_7';
    if (doorSpace) {
      const doorSpaceState = [
        ...fridge.door[spaceKey],
        { id: fridge.door[spaceKey].length + 1, ...item },
      ];
      const fridgeDoorState = { ...fridge.door, [spaceKey]: doorSpaceState };
      dispatch(changeDoorFoods(fridgeDoorState));
    } else {
      const innerSpaceState = [
        ...fridge.inner[spaceKey],
        { id: fridge.inner[spaceKey].length + 1, ...item },
      ];
      const fridgeInnerState = { ...fridge.inner, [spaceKey]: innerSpaceState };
      dispatch(changeInnerFoods(fridgeInnerState));
    }
  };

  const changeFreezerState = (spaceKey: string, item: IFood) => {
    const doorSpace = spaceKey === 'space_3' || spaceKey === 'space_4';
    if (doorSpace) {
      const doorSpaceState = [
        ...freezer.door[spaceKey],
        { id: freezer.door[spaceKey].length + 1, ...item },
      ];
      const freezerDoorState = { ...freezer.door, [spaceKey]: doorSpaceState };
      dispatch(changeFreezerDoorFoods(freezerDoorState));
    } else {
      const innerSpaceState = [
        ...freezer.inner[spaceKey],
        { id: freezer.inner[spaceKey].length + 1, ...item },
      ];
      const freezerInnerState = {
        ...freezer.inner,
        [spaceKey]: innerSpaceState,
      };
      dispatch(changeFreezerInnerFoods(freezerInnerState));
    }
  };

  const [{ isDragging }, dragRef] = useDrag({
    type: 'space',
    item: food,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        freezerMode
          ? changeFreezerState(dropResult.name, item)
          : changeFridgeState(dropResult.name, item);
        dispatch(removeShoppingBagFood(item));
        alert(`${food.name}를 ${dropResult.name}에 넣으셨어요!`);
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
      <Emoji unified={food.emoji} size={45} />
    </DragBox>
  );
};

const DragBox = styled.button`
  height: fit-content;
  transform: translate(0, 0);
`;

export default DraggableFood;
