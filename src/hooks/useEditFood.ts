import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { IFood, ISearchedFood } from 'src/lib/slice/foodSlice';
import {
  changeFreezerDoor,
  changeFreezerInner,
  changeFridgeDoor,
  changeFridgeInner,
  changeAddedFoodInfo,
  showAddedFoodModal,
  modifyBookmark,
} from 'src/lib/slice/index';
import { getSpaceType } from 'src/utils/getSpaceType';
import { useCheckExistFood } from 'src/hooks';

export const useEditFood = () => {
  const [edit, setEdit] = useState(false);
  const { freezerOpen } = useAppSelector((state) => state.doorOpen);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const { addedFood } = useAppSelector((state) => state.addedFood);
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
    dispatch(showAddedFoodModal());
  };

  const insertItemInArr = (arr: IFood[], editedItem: IFood) => {
    const targetIndex = arr.findIndex((food) => food.id === addedFood.id);
    return [
      ...arr.slice(0, targetIndex),
      editedItem,
      ...arr.slice(targetIndex + 1),
    ];
  };

  const changeFridgeFreezerArr = (editedFood: IFood) => {
    const spaceType = getSpaceType(addedFood.space, freezerOpen);
    const spaceArr = [...currentMode[spaceType][addedFood.space]];

    const editedSpaceArr = insertItemInArr(spaceArr, editedFood);
    const newState = {
      ...currentMode[spaceType],
      [addedFood.space]: editedSpaceArr,
    };

    if (spaceType === 'door') {
      dispatch(changeDoorState(newState));
      dispatch(changeAddedFoodInfo(editedFood));
    } else {
      dispatch(changeInnerState(newState));
      dispatch(changeAddedFoodInfo(editedFood));
    }
  };

  const onEditSubmitClick = () => {
    const editedFood = {
      ...addedFood,
      name: nameRef.current?.value,
      quantity: quantityRef.current?.value,
      expiryDate: dateRef.current?.value,
    } as IFood;

    if (nameRef.current?.value === addedFood.name) {
      changeFridgeFreezerArr(editedFood);
      return setEdit((prev) => !prev);
    }
    if (isExistedFood(editedFood as ISearchedFood)) {
      isShoppingBagFoodAlert(editedFood as ISearchedFood);
      isFridgeFoodAlert(editedFood as ISearchedFood);
      isFreezerFoodAlert(editedFood as ISearchedFood);
    } else {
      changeFridgeFreezerArr(editedFood);
      const editedArr = insertItemInArr(bookmark, editedFood);
      dispatch(modifyBookmark(editedArr));
      setEdit((prev) => !prev);
    }
  };

  return {
    changeFridgeFreezerArr,
    closeAddedFoodModal,
    onEditSubmitClick,
    nameRef,
    quantityRef,
    dateRef,
    edit,
    setEdit,
  };
};
