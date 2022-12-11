import { IFood } from 'src/components/template/AddFoodSection';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import {
  changeDoorFoods,
  changeInnerFoods,
} from 'src/lib/slice/fridgeFoodsSlice';

type spaceType = 'doorType' | 'innerType' | 'shoppingBagType';

const useDragFridgeItem = () => {
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const dispatch = useAppDispatch();

  const spaceType = (spaceKey: string, spaceType: spaceType) => {
    switch (spaceType) {
      case 'doorType':
        return (
          spaceKey === 'space_5' ||
          spaceKey === 'space_6' ||
          spaceKey === 'space_7'
        );
      case 'innerType':
        return (
          spaceKey === 'space_1' ||
          spaceKey === 'space_2' ||
          spaceKey === 'space_3' ||
          spaceKey === 'space_4'
        );
      case 'shoppingBagType':
        return spaceKey === 'shoppingBag';

      default:
        break;
    }
  };

  const addItemToDoor = (spaceKey: string, item: IFood) => {
    const doorItem = {
      ...item,
      id: fridge.door[spaceKey].length + 1,
      spaceType: spaceKey as IFood['spaceType'],
    };
    const fridgeDoorState = {
      ...fridge.door,
      [spaceKey]: [...fridge.door[spaceKey], doorItem],
    };
    return dispatch(changeDoorFoods(fridgeDoorState));
  };
  const addItemToInner = (spaceKey: string, item: IFood) => {
    const innerItem = {
      ...item,
      id: fridge.inner[spaceKey].length + 1,
      spaceType: spaceKey,
    };
    const fridgeInnerState = {
      ...fridge.inner,
      [spaceKey]: [...fridge.inner[spaceKey], innerItem],
    };
    return dispatch(changeInnerFoods(fridgeInnerState));
  };

  const removeItemFromInner = (item: IFood) => {
    const fridgeInnerState = {
      ...fridge.inner,
      [item.spaceType]: fridge.inner[item.spaceType]?.filter(
        (innerItem) => innerItem.id !== item.id
      ),
    };
    return dispatch(changeInnerFoods(fridgeInnerState));
  };
  const removeItemFromDoor = (item: IFood) => {
    const fridgeDoorState = {
      ...fridge.door,
      [item.spaceType]: fridge.door[item.spaceType].filter(
        (doorItem) => doorItem.id !== item.id
      ),
    };
    return dispatch(changeDoorFoods(fridgeDoorState));
  };

  const addAndRemoveAtDoor = (spaceKey: string, item: IFood) => {
    const doorItem = {
      ...item,
      id: fridge.door[spaceKey].length + 1,
      spaceType: spaceKey as IFood['spaceType'],
    };
    const fridgeDoorState = {
      ...fridge.door,
      [spaceKey]: [...fridge.door[spaceKey], doorItem],
      [item.spaceType]: fridge.door[item.spaceType].filter(
        (doorItem) => doorItem.id !== item.id
      ),
    };
    return dispatch(changeDoorFoods(fridgeDoorState));
  };
  const addAndRemoveAtInner = (spaceKey: string, item: IFood) => {
    const innerItem = {
      ...item,
      id: fridge.inner[spaceKey].length + 1,
      spaceType: spaceKey as IFood['spaceType'],
    };
    const fridgeInnerState = {
      ...fridge.inner,
      [spaceKey]: [...fridge.inner[spaceKey], innerItem],
      [item.spaceType]: fridge.inner[item.spaceType].filter(
        (innerItem) => innerItem.id !== item.id
      ),
    };
    return dispatch(changeInnerFoods(fridgeInnerState));
  };

  const changeDoorState = (spaceKey: string, item: IFood) => {
    if (spaceType(item.spaceType, 'doorType')) {
      // door -> door
      if (item.spaceType === spaceKey) return;
      addAndRemoveAtDoor(spaceKey, item);
    } else {
      // inner -> door
      removeItemFromInner(item);
      addItemToDoor(spaceKey, item);
    }
  };
  const changeInnerState = (spaceKey: string, item: IFood) => {
    if (spaceType(item.spaceType, 'doorType')) {
      // door -> inner
      removeItemFromDoor(item);
      addItemToInner(spaceKey, item);
    } else {
      // inner -> inner
      if (item.spaceType === spaceKey) return;
      addAndRemoveAtInner(spaceKey, item);
    }
  };

  const changeFridgeState = (spaceKey: string, item: IFood) => {
    if (spaceType(item.spaceType, 'shoppingBagType')) {
      return spaceType(spaceKey, 'doorType')
        ? addItemToDoor(spaceKey, item)
        : addItemToInner(spaceKey, item);
    }
    if (spaceType(spaceKey, 'doorType')) {
      changeDoorState(spaceKey, item);
    } else {
      changeInnerState(spaceKey, item);
    }
  };

  return {
    changeFridgeState,
  };
};

export default useDragFridgeItem;
