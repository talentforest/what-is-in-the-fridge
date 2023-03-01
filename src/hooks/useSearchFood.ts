import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeFoodInfo } from 'src/lib/slice';
import { changeKeyword } from 'src/lib/slice';
import { v4 as uuidv4 } from 'uuid';

export const useSearchFood = () => {
  const { food } = useAppSelector((state) => state.food);
  const { keyword } = useAppSelector((state) => state.keyword);
  const dispatch = useAppDispatch();

  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    if (keyword.length === 0) {
      const result = {
        ...food,
        name: '',
      };
      dispatch(changeFoodInfo(result));
    }
    dispatch(changeKeyword(value));
  };

  const onKeywordSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const result = {
      ...food,
      name: keyword,
    };

    dispatch(changeFoodInfo(result));
  };

  const onCartIconClick = (name: string, imgUrl: string) => {
    const result = {
      ...food,
      name,
      id: uuidv4(),
      imgUrl,
    };
    dispatch(changeFoodInfo(result));
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
