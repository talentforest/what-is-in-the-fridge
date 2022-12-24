import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { IFood } from 'src/lib/slice/foodSlice';
import {
  changeFreezerDoor,
  changeFreezerInner,
  changeFridgeDoor,
  changeFridgeInner,
  showAddedFoodModal,
} from 'src/lib/slice/index';
import { getSpaceType } from 'src/utils/getSpaceType';

export const useHandleAddedFood = () => {
  const { freezerOpen } = useAppSelector((state) => state.doorOpen);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const { addedFood } = useAppSelector((state) => state.addedFood);
  const dispatch = useAppDispatch();

  const currentMode = freezerOpen ? freezer : fridge;
  const changeMode = freezerOpen ? fridge : freezer;
  const changeDoorState = freezerOpen ? changeFreezerDoor : changeFridgeDoor;
  const changeInnerState = freezerOpen ? changeFreezerInner : changeFridgeInner;

  const moveToAnotherMode = () => {
    removeAddedFood();
    const movedItem = {
      ...addedFood,
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
    const { space } = addedFood;
    const spaceType = getSpaceType(space, freezerOpen);
    const removedSpaceArr = currentMode[spaceType][addedFood.space].filter(
      (food) => food.id !== addedFood.id
    );
    const newState = {
      ...currentMode[spaceType],
      [space]: removedSpaceArr,
    };
    getSpaceType(space, freezerOpen) === 'door'
      ? dispatch(changeDoorState(newState))
      : dispatch(changeInnerState(newState));

    dispatch(showAddedFoodModal());
  };

  return {
    removeAddedFood,
    moveToAnotherMode,
  };
};
