import { useRef, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeAddedFoodInfo } from 'src/lib/slice/addedFood';
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

const useEditFoodInfo = () => {
  const [edit, setEdit] = useState(false);
  const { freezerMode } = useAppSelector((state) => state.freezerMode);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const { addedFood } = useAppSelector((state) => state.addedFood);
  const dispatch = useAppDispatch();
  const currentMode = freezerMode ? freezer : fridge;

  const nameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>(null);

  const closeAddedFoodModal = () => {
    dispatch(showAddedFoodModal());
  };

  const onEditSubmitClick = () => {
    const editedFood = {
      ...addedFood,
      name: nameRef.current?.value,
      quantity: quantityRef.current?.value,
      expiryDate: dateRef.current?.value,
    } as IFood;
    const spaceType = getSpaceType(addedFood.space, freezerMode);
    const spaceArr = [...currentMode[spaceType][addedFood.space]];
    if (addedFood.id) {
      spaceArr[addedFood.id - 1] = editedFood;
    }
    const newState = {
      ...currentMode[spaceType],
      [addedFood.space]: spaceArr,
    };
    if (freezerMode) {
      if (spaceType === 'door') {
        dispatch(changeFreezerDoor(newState));
        dispatch(changeAddedFoodInfo(editedFood));
      } else {
        dispatch(changeFreezerInner(newState));
        dispatch(changeAddedFoodInfo(editedFood));
      }
    } else {
      if (spaceType === 'door') {
        dispatch(changeFridgeDoor(newState));
        dispatch(changeAddedFoodInfo(editedFood));
      } else {
        dispatch(changeFridgeInner(newState));
        dispatch(changeAddedFoodInfo(editedFood));
      }
    }

    setEdit((prev) => !prev);
  };

  return {
    closeAddedFoodModal,
    onEditSubmitClick,
    nameRef,
    quantityRef,
    dateRef,
    edit,
    setEdit,
  };
};

export default useEditFoodInfo;
