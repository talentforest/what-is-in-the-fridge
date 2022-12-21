import { IFood, spaceName } from 'src/lib/slice/foodSlice';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import {
  changeFridgeDoor,
  changeFridgeInner,
  changeFreezerDoor,
  changeFreezerInner,
} from 'src/lib/slice/index';
import { getSpaceType } from 'src/utils/getSpaceType';

export const useDragFood = () => {
  const { freezerMode } = useAppSelector((state) => state.freezerMode);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const dispatch = useAppDispatch();

  const currentMode = freezerMode ? freezer : fridge;
  const changeDoorState = freezerMode ? changeFreezerDoor : changeFridgeDoor;
  const changeInnerState = freezerMode ? changeFreezerInner : changeFridgeInner;

  const addFoodAtNewSpace = (spaceKey: spaceName, prevFood: IFood) => {
    const itemToAdd: IFood = {
      ...prevFood,
      space: spaceKey as IFood['space'],
    };
    const spaceType = getSpaceType(spaceKey, freezerMode);
    const newState = {
      ...currentMode[spaceType],
      [spaceKey]: [...currentMode[spaceType][spaceKey], itemToAdd],
    };
    return spaceType === 'door'
      ? dispatch(changeDoorState(newState))
      : dispatch(changeInnerState(newState));
  };

  const removeFoodFromPrevSpace = (prevFood: IFood) => {
    const removingSpaceType = getSpaceType(prevFood.space, freezerMode);
    const newState = {
      ...currentMode[removingSpaceType],
      [prevFood.space]: currentMode[removingSpaceType][prevFood.space].filter(
        (food) => food.id !== prevFood.id
      ),
    };
    return removingSpaceType === 'door'
      ? dispatch(changeDoorState(newState))
      : dispatch(changeInnerState(newState));
  };

  const addAndRemoveFoods = (spaceKey: spaceName, prevFood: IFood) => {
    const innerItem = {
      ...prevFood,
      space: spaceKey as IFood['space'],
    };
    const spaceType = getSpaceType(spaceKey, freezerMode);
    const prevSpaceType = getSpaceType(prevFood.space, freezerMode);
    const newState = {
      ...currentMode[spaceType],
      [spaceKey]: [...currentMode[spaceType][spaceKey], innerItem],
      [prevFood.space]: currentMode[prevSpaceType][prevFood.space].filter(
        (innerItem) => innerItem.id !== prevFood.id
      ),
    };
    return spaceType === 'door'
      ? dispatch(changeDoorState(newState))
      : dispatch(changeInnerState(newState));
  };

  const changeDoorItems = (spaceKey: spaceName, prevItem: IFood) => {
    const prevSpaceType = getSpaceType(prevItem.space, freezerMode);
    if (prevSpaceType === 'door') {
      addAndRemoveFoods(spaceKey, prevItem); // door -> door
    } else {
      removeFoodFromPrevSpace(prevItem); // inner -> door
      addFoodAtNewSpace(spaceKey, prevItem);
    }
  };

  const changeInnerItems = (spaceKey: spaceName, prevItem: IFood) => {
    const prevSpaceType = getSpaceType(prevItem.space, freezerMode);
    if (prevSpaceType === 'inner') {
      addAndRemoveFoods(spaceKey, prevItem); // inner -> inner
    } else {
      removeFoodFromPrevSpace(prevItem); // door -> inner
      addFoodAtNewSpace(spaceKey, prevItem);
    }
  };

  const changeFoodsState = (spaceKey: spaceName, prevItem: IFood) => {
    if (prevItem.space === spaceKey) return;
    const spaceType = getSpaceType(spaceKey, freezerMode);
    if (prevItem.space === 'shoppingBag') {
      return addFoodAtNewSpace(spaceKey, prevItem);
    }
    spaceType === 'door'
      ? changeDoorItems(spaceKey, prevItem)
      : changeInnerItems(spaceKey, prevItem);
  };

  return {
    changeFoodsState,
  };
};
