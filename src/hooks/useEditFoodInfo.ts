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
  addBookmark,
  removeBookmark,
} from 'src/lib/slice/index';
import { getSpaceType } from 'src/utils/getSpaceType';

export const useEditFoodInfo = () => {
  const [edit, setEdit] = useState(false);
  const { freezerOpen } = useAppSelector((state) => state.doorOpen);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const { addedFood } = useAppSelector((state) => state.addedFood);
  const dispatch = useAppDispatch();

  const currentMode = freezerOpen ? freezer : fridge;
  const changeDoorState = freezerOpen ? changeFreezerDoor : changeFridgeDoor;
  const changeInnerState = freezerOpen ? changeFreezerInner : changeFridgeInner;

  const nameRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const dateRef = useRef<HTMLInputElement>();

  const onEditSubmitClick = () => {
    const editedFood = {
      ...addedFood,
      name: nameRef.current?.value,
      quantity: quantityRef.current?.value,
      expiryDate: dateRef.current?.value,
    } as IFood;

    const spaceType = getSpaceType(addedFood.space, freezerOpen);
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

  const changeBookmarkStateInArr = () => {
    const editedFood = {
      ...addedFood,
      bookmark: !addedFood.bookmark,
    } as IFood;

    const spaceType = getSpaceType(addedFood.space, freezerOpen);
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

  const onBookMarkClick = () => {
    const { id, name, type, emoji, imgUrl, bookmark } = addedFood;
    changeBookmarkStateInArr();
    const bookmarkInfo = { id, name, type, emoji, imgUrl, bookmark: !bookmark };
    // 이름과 함께 이미지(emoji or imgUrl)가 같을 때 즐겨찾는 식품에 추가안됨
    // 즐겨찾는 식품으로 추가해 중복된 아이템이 있을 경우 즐겨찾기 삭제할 때 다 같이 삭제됨
    !addedFood.bookmark
      ? dispatch(addBookmark(bookmarkInfo))
      : dispatch(removeBookmark(bookmarkInfo));
  };

  return {
    changeBookmarkStateInArr,
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
