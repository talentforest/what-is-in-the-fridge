import { ChangeEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeFoodInfo } from 'src/lib/slice';
import { v4 as uuidv4 } from 'uuid';

export const useSearchFood = () => {
  const [keyword, setKeyword] = useState('');
  const { food } = useAppSelector((state) => state.food);
  const dispatch = useAppDispatch();

  const onKeywordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setKeyword(value);
  };

  const onProductNameSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
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

  const onSelfWriteClick = () => {
    const result = {
      ...food,
      id: uuidv4(),
    };
    dispatch(changeFoodInfo(result));
    setKeyword('');
  };

  return {
    keyword,
    onKeywordChange,
    onProductNameSubmit,
    onCartIconClick,
    onSelfWriteClick,
  };
};
