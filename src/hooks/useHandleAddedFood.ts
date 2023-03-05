import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { IFood } from 'src/lib/slice/newFoodSlice';
import {
  changeFreezerDoor,
  changeFreezerInner,
  changeFridgeDoor,
  changeFridgeInner,
  toggleStoredFoodModal,
} from 'src/lib/slice/index';
import { getSpaceName } from 'src/utils/getSpaceName';

export const useHandleAddedFood = () => {
  const { freezerOpen } = useAppSelector((state) => state.doorOpen);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const { storedFood } = useAppSelector((state) => state.storedFood);
  const dispatch = useAppDispatch();

  const currentMode = freezerOpen ? freezer : fridge;
  const changeMode = freezerOpen ? fridge : freezer;
  const changeDoorState = freezerOpen ? changeFreezerDoor : changeFridgeDoor;
  const changeInnerState = freezerOpen ? changeFreezerInner : changeFridgeInner;

  const moveToAnotherMode = () => {
    removeAddedFood();
    const movedItem = {
      ...storedFood,
      space: 'space_1' as IFood['space'],
    };
    const newState = {
      ...changeMode.inner,
      ['space_1']: [...changeMode.inner.space_1, movedItem],
    };
    freezerOpen
      ? dispatch(changeFridgeInner(newState))
      : dispatch(changeFreezerInner(newState));
  };

  const removeAddedFood = () => {
    const { space } = storedFood;
    const spaceType = getSpaceName(space, freezerOpen);
    const removedSpaceArr = currentMode[spaceType][storedFood.space].filter(
      (food) => food.id !== storedFood.id
    );
    const newState = {
      ...currentMode[spaceType],
      [space]: removedSpaceArr,
    };
    getSpaceName(space, freezerOpen) === 'door'
      ? dispatch(changeDoorState(newState))
      : dispatch(changeInnerState(newState));

    dispatch(toggleStoredFoodModal());
  };

  return {
    removeAddedFood,
    moveToAnotherMode,
  };
};
