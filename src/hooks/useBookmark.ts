import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { addBookmark, changeFoodInfo, removeBookmark } from 'src/lib/slice';

export const useBookmark = () => {
  const { food } = useAppSelector((state) => state.food);
  const dispatch = useAppDispatch();

  const bookmarkClick = () => {
    const result = { ...food, bookmark: !food.bookmark };
    dispatch(changeFoodInfo(result));
    const bookmarkInfo = {
      id: food.id,
      name: food.name,
      type: food.type,
      emoji: food.emoji,
      imgUrl: food.imgUrl,
      bookmark: food.bookmark,
    };
    !food.bookmark
      ? dispatch(addBookmark(bookmarkInfo))
      : dispatch(removeBookmark(bookmarkInfo));
  };
  return {
    bookmarkClick,
  };
};
