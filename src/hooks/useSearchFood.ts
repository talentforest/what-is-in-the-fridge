import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeNewFood } from 'src/lib/slice';
import { changeKeyword } from 'src/lib/slice';
import { v4 as uuidv4 } from 'uuid';

export const useSearchFood = () => {
  const { newFood } = useAppSelector((state) => state.newFood);
  const { keyword } = useAppSelector((state) => state.keyword);
  const dispatch = useAppDispatch();

  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (keyword.length === 0) {
      const result = {
        ...newFood,
        name: '',
      };
      dispatch(changeNewFood(result));
    }
    dispatch(changeKeyword(value));
  };

  const onKeywordSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = {
      ...newFood,
      name: keyword,
    };

    dispatch(changeNewFood(result));
  };

  const onCartIconClick = (name: string, imgUrl: string) => {
    const result = {
      ...newFood,
      name,
      id: uuidv4(),
      imgUrl,
    };
    dispatch(changeNewFood(result));
  };

  const removeKeyword = () => {
    return dispatch(changeKeyword(''));
  };

  return {
    onKeywordChange,
    onKeywordSubmit,
    onCartIconClick,
    removeKeyword,
  };
};
