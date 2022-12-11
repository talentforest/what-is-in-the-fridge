import { IFood } from 'src/lib/slice/foodSlice';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import {
  changeFridgeDoor,
  changeFridgeInner,
} from 'src/lib/slice/fridgeFoodsSlice';
import {
  changeFreezerDoor,
  changeFreezerInner,
} from 'src/lib/slice/freezerFoodsSlice';

type spaceType = 'door' | 'inner' | 'shoppingBag';

const useDragItem = () => {
  const { freezerMode } = useAppSelector((state) => state.freezerMode);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const dispatch = useAppDispatch();

  const currentMode = freezerMode ? freezer : fridge;
  const changeDoorState = freezerMode ? changeFreezerDoor : changeFridgeDoor;
  const changeInnerState = freezerMode ? changeFreezerInner : changeFridgeInner;

  const spaceType = (spaceKey: string, spaceType: spaceType) => {
    switch (spaceType) {
      case 'door':
        return Object.keys(currentMode.door).includes(spaceKey);
      case 'inner':
        return Object.keys(currentMode.inner).includes(spaceKey);
      case 'shoppingBag':
        return spaceKey === 'shoppingBag';
      default:
        break;
    }
  };

  const addItemToDoor = (spaceKey: string, prevItem: IFood) => {
    const doorItem = {
      ...prevItem,
      id: currentMode.door[spaceKey].length + 1,
      space: spaceKey as IFood['space'],
    };
    const doorState = {
      ...currentMode.door,
      [spaceKey]: [...currentMode.door[spaceKey], doorItem],
    };
    return dispatch(changeDoorState(doorState));
  };
  const addItemToInner = (spaceKey: string, prevItem: IFood) => {
    const innerItem = {
      ...prevItem,
      id: currentMode.inner[spaceKey].length + 1,
      space: spaceKey,
    };
    const innerState = {
      ...currentMode.inner,
      [spaceKey]: [...currentMode.inner[spaceKey], innerItem],
    };
    return dispatch(changeInnerState(innerState));
  };

  const removeItemFromInner = (prevItem: IFood) => {
    const innerState = {
      ...currentMode.inner,
      [prevItem.space]: currentMode.inner[prevItem.space]?.filter(
        (innerItem) => innerItem.id !== prevItem.id
      ),
    };
    return dispatch(changeInnerState(innerState));
  };
  const removeItemFromDoor = (prevItem: IFood) => {
    const doorState = {
      ...currentMode.door,
      [prevItem.space]: currentMode.door[prevItem.space].filter(
        (doorItem) => doorItem.id !== prevItem.id
      ),
    };
    return dispatch(changeDoorState(doorState));
  };

  const addAndRemoveFromDoor = (spaceKey: string, prevItem: IFood) => {
    const doorItem = {
      ...prevItem,
      id: currentMode.door[spaceKey].length + 1,
      space: spaceKey as IFood['space'],
    };
    const doorState = {
      ...currentMode.door,
      [spaceKey]: [...currentMode.door[spaceKey], doorItem],
      [prevItem.space]: currentMode.door[prevItem.space].filter(
        (doorItem) => doorItem.id !== prevItem.id
      ),
    };
    return dispatch(changeDoorState(doorState));
  };
  const addAndRemoveFromInner = (spaceKey: string, prevItem: IFood) => {
    const innerItem = {
      ...prevItem,
      id: currentMode.inner[spaceKey].length + 1,
      space: spaceKey as IFood['space'],
    };
    const innerState = {
      ...currentMode.inner,
      [spaceKey]: [...currentMode.inner[spaceKey], innerItem],
      [prevItem.space]: currentMode.inner[prevItem.space].filter(
        (innerItem) => innerItem.id !== prevItem.id
      ),
    };
    return dispatch(changeInnerState(innerState));
  };

  const changeDoorItems = (spaceKey: string, prevItem: IFood) => {
    if (spaceType(prevItem.space, 'door')) {
      if (prevItem.space === spaceKey) return; // door -> door
      addAndRemoveFromDoor(spaceKey, prevItem);
    } else {
      removeItemFromInner(prevItem); // inner -> door
      addItemToDoor(spaceKey, prevItem);
    }
  };
  const changeInnerItems = (spaceKey: string, prevItem: IFood) => {
    if (spaceType(prevItem.space, 'door')) {
      removeItemFromDoor(prevItem); // door -> inner
      addItemToInner(spaceKey, prevItem);
    } else {
      if (prevItem.space === spaceKey) return; // inner -> inner
      addAndRemoveFromInner(spaceKey, prevItem);
    }
  };

  const changeFoodsState = (spaceKey: string, prevItem: IFood) => {
    if (spaceType(prevItem.space, 'shoppingBag')) {
      return spaceType(spaceKey, 'door')
        ? addItemToDoor(spaceKey, prevItem)
        : addItemToInner(spaceKey, prevItem);
    }
    spaceType(spaceKey, 'door')
      ? changeDoorItems(spaceKey, prevItem)
      : changeInnerItems(spaceKey, prevItem);
  };

  return {
    changeFoodsState,
  };
};

export default useDragItem;
