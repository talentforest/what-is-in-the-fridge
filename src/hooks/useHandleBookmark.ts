import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { addBookmark, removeBookmark } from 'src/lib/slice';
import {
  changeNewFood,
  IFood,
  ISearchedFood,
} from 'src/lib/slice/newFoodSlice';
import { useEditFood } from './useEditFood';
import { v4 as uuidv4 } from 'uuid';
import { useCheckExistFood } from 'src/hooks';

export const useHandleBookmark = () => {
  const { newFood } = useAppSelector((state) => state.newFood);
  const { storedFood } = useAppSelector((state) => state.storedFood);
  const { changeFridgeFreezerArr } = useEditFood();
  const { isExistedFood, isFridgeFoodAlert, isFreezerFoodAlert } =
    useCheckExistFood();
  const dispatch = useAppDispatch();

  const changeBookmarkState = () => {
    const editedBookmarkFood = {
      ...storedFood,
      bookmark: !storedFood.bookmark,
    } as IFood;
    changeFridgeFreezerArr(editedBookmarkFood);
  };

  const onBookmarkClick = () => {
    const { id, name, type, emoji, imgUrl, bookmark } = storedFood;
    const bookmarkInfo = { id, name, type, emoji, imgUrl, bookmark: !bookmark };
    changeBookmarkState();
    !storedFood.bookmark
      ? dispatch(addBookmark(bookmarkInfo))
      : dispatch(removeBookmark(bookmarkInfo));
  };

  const onRemoveClick = (item: any) => {
    const confirmMSG = confirm('정말 삭제하시겠어요?');
    if (confirmMSG) {
      dispatch(removeBookmark(item));
      changeBookmarkState();
    }
  };

  const onAddFoodClick = (item: ISearchedFood) => {
    if (isExistedFood(item as ISearchedFood)) {
      isFridgeFoodAlert(item);
      isFreezerFoodAlert(item);
    } else {
      const result = {
        ...newFood,
        id: uuidv4(),
        imgUrl: item.imgUrl,
        name: item.name,
        type: item.type,
        emoji: item.emoji,
        bookmark: true,
      };
      dispatch(changeNewFood(result));
    }
  };

  return {
    onBookmarkClick,
    onRemoveClick,
    onAddFoodClick,
  };
};
