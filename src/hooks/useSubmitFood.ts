import { EmojiClickData } from 'emoji-picker-react';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeFoodInfo, showEmoji, showFoodModal } from 'src/lib/slice/index';
import { IfoodCategory } from 'src/utils/foodCategory';
import { v4 as uuidv4 } from 'uuid';
import { ISearchedFood } from 'src/lib/slice/foodSlice';
import { useCheckExistFood } from 'src/hooks';

export const useSubmitFood = () => {
  const { food } = useAppSelector((state) => state.food);
  const {
    isExistedFood,
    isShoppingBagFoodAlert,
    isFridgeFoodAlert,
    isFreezerFoodAlert,
  } = useCheckExistFood();
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, type, expiryDate, quantity } = food;
    if (name.length === 0) return alert('식료품 이름을 적어주세요.');
    if (type.length === 0) return alert('식료품 카테고리를 적어주세요.');
    if (expiryDate.length === 0) return alert('식료품 유통기한을 적어주세요.');
    if (quantity.length === 0) return alert('식료품 개수를 적어주세요.');

    if (isExistedFood(food as ISearchedFood)) {
      isShoppingBagFoodAlert(food as ISearchedFood);
      isFridgeFoodAlert(food as ISearchedFood);
      isFreezerFoodAlert(food as ISearchedFood);
    } else {
      dispatch(changeFoodInfo(food));
      dispatch(showFoodModal());
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const result = {
      ...food,
      emoji: emojiData.unified,
    };
    dispatch(changeFoodInfo(result));
    dispatch(showEmoji());
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = {
      ...food,
      name: e.currentTarget.value,
    };
    dispatch(changeFoodInfo(result));
  };

  const onQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = {
      ...food,
      quantity: e.target?.value ? Math.abs(+e.target?.value) : '',
    };
    dispatch(changeFoodInfo(result));
  };

  const onFoodTypeClick = (foodTypes: IfoodCategory) => {
    const result = {
      ...food,
      type: foodTypes.type,
      id: uuidv4(),
    };
    dispatch(changeFoodInfo(result));
  };

  return {
    onSubmit,
    onEmojiClick,
    onNameChange,
    onQuantityChange,
    onFoodTypeClick,
  };
};
