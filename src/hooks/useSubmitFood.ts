import { EmojiClickData } from 'emoji-picker-react';
import { ChangeEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import {
  changeNewFood,
  showEmojiBox,
  toggleNewFoodModal,
} from 'src/lib/slice/index';
import { IfoodCategory } from 'src/utils/foodCategory';
import { v4 as uuidv4 } from 'uuid';
import { ISearchedFood } from 'src/lib/slice/newFoodSlice';
import { useCheckExistFood } from 'src/hooks';

export const useSubmitFood = () => {
  const { newFood } = useAppSelector((state) => state.newFood);
  const {
    isExistedFood,
    isShoppingBagFoodAlert,
    isFridgeFoodAlert,
    isFreezerFoodAlert,
  } = useCheckExistFood();
  const dispatch = useAppDispatch();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { name, type, expiryDate, quantity } = newFood;
    if (name.length === 0) return alert('식료품 이름을 적어주세요.');
    if (type.length === 0) return alert('식료품 카테고리를 적어주세요.');
    if (expiryDate.length === 0) return alert('식료품 유통기한을 적어주세요.');
    if (quantity.length === 0) return alert('식료품 개수를 적어주세요.');

    if (isExistedFood(newFood as ISearchedFood)) {
      isShoppingBagFoodAlert(newFood as ISearchedFood);
      isFridgeFoodAlert(newFood as ISearchedFood);
      isFreezerFoodAlert(newFood as ISearchedFood);
    } else {
      dispatch(changeNewFood(newFood));
      dispatch(toggleNewFoodModal());
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const result = {
      ...newFood,
      emoji: emojiData.unified,
    };
    dispatch(changeNewFood(result));
    dispatch(showEmojiBox());
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = {
      ...newFood,
      name: e.currentTarget.value,
    };
    dispatch(changeNewFood(result));
  };

  const onQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = {
      ...newFood,
      quantity: e.target?.value ? Math.abs(+e.target?.value) : '',
    };
    dispatch(changeNewFood(result));
  };

  const onFoodTypeClick = (foodTypes: IfoodCategory) => {
    const result = {
      ...newFood,
      type: foodTypes.type,
      id: uuidv4(),
    };
    dispatch(changeNewFood(result));
  };

  return {
    onSubmit,
    onEmojiClick,
    onNameChange,
    onQuantityChange,
    onFoodTypeClick,
  };
};
