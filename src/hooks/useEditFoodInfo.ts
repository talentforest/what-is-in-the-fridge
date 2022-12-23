import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { IFood } from 'src/lib/slice/foodSlice';
import {
  changeFreezerDoor,
  changeFreezerInner,
  changeFridgeDoor,
  changeFridgeInner,
  changeAddedFoodInfo,
  showAddedFoodModal,
} from 'src/lib/slice/index';
import { getSpaceType } from 'src/utils/getSpaceType';

export const useEditFoodInfo = (addedFoodModal: boolean | undefined) => {
  const [edit, setEdit] = useState(false);
  const { freezerMode } = useAppSelector((state) => state.freezerMode);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const { addedFood } = useAppSelector((state) => state.addedFood);
  const dispatch = useAppDispatch();
  const currentMode = freezerMode ? freezer : fridge;
  const changeDoorState = freezerMode ? changeFreezerDoor : changeFridgeDoor;
  const changeInnerState = freezerMode ? changeFreezerInner : changeFridgeInner;

  const nameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const onEditSubmitClick = () => {
    const editedFood = {
      ...addedFood,
      name: nameRef.current?.value,
      quantity: quantityRef.current?.value,
      expiryDate: dateRef.current?.value,
    } as IFood;

    const spaceType = getSpaceType(addedFood.space, freezerMode);
    const spaceArr = [...currentMode[spaceType][addedFood.space]];
    const targetIndex = spaceArr.findIndex((food) => food.id === addedFood.id);
    const editedSpaceArr = [
      ...spaceArr.slice(0, targetIndex),
      editedFood,
      ...spaceArr.slice(targetIndex + 1),
    ];
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

    setEdit((prev) => !prev);
  };

  const closeAddedFoodModal = () => {
    dispatch(showAddedFoodModal());
  };

  const onBookMarkClick = () => {
    const editedFood = {
      ...addedFood,
      bookmark: !addedFood.bookmark,
    } as IFood;

    const spaceType = getSpaceType(addedFood.space, freezerMode);
    const spaceArr = [...currentMode[spaceType][addedFood.space]];
    const targetIndex = spaceArr.findIndex((food) => food.id === addedFood.id);
    const editedSpaceArr = [
      ...spaceArr.slice(0, targetIndex),
      editedFood,
      ...spaceArr.slice(targetIndex + 1),
    ];
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

  return {
    closeAddedFoodModal,
    onEditSubmitClick,
    onBookMarkClick,
    nameRef,
    quantityRef,
    dateRef,
    edit,
    setEdit,
  };
};
