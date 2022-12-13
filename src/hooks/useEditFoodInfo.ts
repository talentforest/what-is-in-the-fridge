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
    const foodIndex = spaceArr.findIndex((food) => food.id === addedFood.id);
    spaceArr.splice(foodIndex, 1, editedFood);
    console.log(spaceArr);

    const newState = {
      ...currentMode[spaceType],
      [addedFood.space]: spaceArr,
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
