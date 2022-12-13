import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { IFood } from 'src/lib/slice/foodSlice';
import {
  changeFreezerDoor,
  changeFreezerInner,
} from 'src/lib/slice/freezerFoodsSlice';
import {
  changeFridgeDoor,
  changeFridgeInner,
} from 'src/lib/slice/fridgeFoodsSlice';
import { showAddedFoodModal } from 'src/lib/slice/showAddedFoodModal';
import { getSpaceType } from 'src/utils/getSpaceType';

const useHandleAddedFood = () => {
  const { freezerMode } = useAppSelector((state) => state.freezerMode);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const { addedFood } = useAppSelector((state) => state.addedFood);
  const dispatch = useAppDispatch();

  const currentMode = freezerMode ? freezer : fridge;
  const changeMode = freezerMode ? fridge : freezer;
  const changeDoorState = freezerMode ? changeFreezerDoor : changeFridgeDoor;
  const changeInnerState = freezerMode ? changeFreezerInner : changeFridgeInner;

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
    freezerMode
      ? dispatch(changeFridgeInner(newState))
      : dispatch(changeFreezerInner(newState));
  };

  const removeAddedFood = () => {
    const { space } = addedFood;
    const spaceType = getSpaceType(space, freezerMode);
    const removedSpaceArr = currentMode[spaceType][addedFood.space].filter(
      (food) => food.id !== addedFood.id
    );
    const newState = {
      ...currentMode[spaceType],
      [space]: removedSpaceArr,
    };
    getSpaceType(space, freezerMode) === 'door'
      ? dispatch(changeDoorState(newState))
      : dispatch(changeInnerState(newState));

    dispatch(showAddedFoodModal());
  };

  return {
    removeAddedFood,
    moveToAnotherMode,
  };
};

export default useHandleAddedFood;
