import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { IFood, ISearchedFood } from 'src/lib/slice/newFoodSlice';
import {
  changeFreezerDoor,
  changeFreezerInner,
  changeFridgeDoor,
  changeFridgeInner,
  changeStoredFood,
  toggleStoredFoodModal,
  modifyBookmark,
} from 'src/lib/slice/index';
import { getSpaceName } from 'src/utils/getSpaceName';
import { useCheckExistFood } from 'src/hooks';

export const useEditFood = () => {
  const [editing, setEditing] = useState(false);
  const { freezerOpen } = useAppSelector((state) => state.doorOpen);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const { storedFood } = useAppSelector((state) => state.storedFood);
  const { bookmark } = useAppSelector((state) => state.bookmark);
  const {
    isExistedFood,
    isShoppingBagFoodAlert,
    isFridgeFoodAlert,
    isFreezerFoodAlert,
  } = useCheckExistFood();
  const dispatch = useAppDispatch();

  const nameRef = useRef<HTMLInputElement>();
  const quantityRef = useRef<HTMLInputElement>();
  const dateRef = useRef<HTMLInputElement>();

  const currentMode = freezerOpen ? freezer : fridge;
  const changeDoorState = freezerOpen ? changeFreezerDoor : changeFridgeDoor;
  const changeInnerState = freezerOpen ? changeFreezerInner : changeFridgeInner;

  const closeAddedFoodModal = () => {
    dispatch(toggleStoredFoodModal());
  };

  const insertItemInArr = (arr: IFood[], editedItem: IFood) => {
    const targetIndex = arr.findIndex((food) => food.id === storedFood.id);
    return [
      ...arr.slice(0, targetIndex),
      editedItem,
      ...arr.slice(targetIndex + 1),
    ];
  };

  const changeFridgeFreezerArr = (editedFood: IFood) => {
    const spaceType = getSpaceName(storedFood.space, freezerOpen);
    const spaceArr = [...currentMode[spaceType][storedFood.space]];

    const editedSpaceArr = insertItemInArr(spaceArr, editedFood);
    const newState = {
      ...currentMode[spaceType],
      [storedFood.space]: editedSpaceArr,
    };

    if (spaceType === 'door') {
      dispatch(changeDoorState(newState));
      dispatch(changeStoredFood(editedFood));
    } else {
      dispatch(changeInnerState(newState));
      dispatch(changeStoredFood(editedFood));
    }
  };

  const onEditSubmitClick = () => {
    const editedFood = {
      ...storedFood,
      name: nameRef.current?.value,
      quantity: quantityRef.current?.value,
      expiryDate: dateRef.current?.value,
    } as IFood;

    if (nameRef.current?.value === storedFood.name) {
      changeFridgeFreezerArr(editedFood);
      return setEditing((prev) => !prev);
    }
    if (isExistedFood(editedFood as ISearchedFood)) {
      isShoppingBagFoodAlert(editedFood as ISearchedFood);
      isFridgeFoodAlert(editedFood as ISearchedFood);
      isFreezerFoodAlert(editedFood as ISearchedFood);
    } else {
      changeFridgeFreezerArr(editedFood);
      const editedArr = insertItemInArr(bookmark, editedFood);
      dispatch(modifyBookmark(editedArr));
      setEditing((prev) => !prev);
    }
  };

  return {
    changeFridgeFreezerArr,
    closeAddedFoodModal,
    onEditSubmitClick,
    nameRef,
    quantityRef,
    dateRef,
    editing,
    setEditing,
  };
};
