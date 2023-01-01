import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { addBookmark, removeBookmark } from 'src/lib/slice';
import { changeFoodInfo, IFood, ISearchedFood } from 'src/lib/slice/foodSlice';
import { useEditFood } from './useEditFood';
import { v4 as uuidv4 } from 'uuid';
import { useCheckExistFood } from 'src/hooks';

export const useHandleBookmark = () => {
  const { food } = useAppSelector((state) => state.food);
  const { addedFood } = useAppSelector((state) => state.addedFood);
  const { changeFridgeFreezerArr } = useEditFood();
  const { isExistedFood, isFridgeFoodAlert, isFreezerFoodAlert } =
    useCheckExistFood();
  const dispatch = useAppDispatch();

  const changeBookmarkState = () => {
    const editedBookmarkFood = {
      ...addedFood,
      bookmark: !addedFood.bookmark,
    } as IFood;
    changeFridgeFreezerArr(editedBookmarkFood);
  };

  const onBookmarkClick = () => {
    const { id, name, type, emoji, imgUrl, bookmark } = addedFood;
    const bookmarkInfo = { id, name, type, emoji, imgUrl, bookmark: !bookmark };
    changeBookmarkState();
    !addedFood.bookmark
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
        ...food,
        id: uuidv4(),
        imgUrl: item.imgUrl,
        name: item.name,
        type: item.type,
        emoji: item.emoji,
        bookmark: true,
      };
      dispatch(changeFoodInfo(result));
    }
  };

  return {
    onBookmarkClick,
    onRemoveClick,
    onAddFoodClick,
  };
};
