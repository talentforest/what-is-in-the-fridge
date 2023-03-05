import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import {
  changeNewFood,
  toggleNewFoodModal,
  addToShoppingBag,
} from 'src/lib/slice/index';
import { changeKeyword } from 'src/lib/slice';
import { today } from 'src/utils/dateUtils';

export const initialState = {
  id: '',
  type: '',
  name: '',
  space: 'shoppingBag',
  emoji: '1f34b',
  expiryDate: today,
  quantity: '',
};

export const useAddFood = () => {
  const { newFood } = useAppSelector((state) => state.newFood);
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);
  const dispatch = useAppDispatch();

  const onAddFoodClick = () => {
    if (shoppingBagFoods.length >= 8) {
      alert('장바구니에 식료품을 8개 넣을 수 없습니다.');
      dispatch(toggleNewFoodModal());
      return;
    }
    dispatch(changeKeyword(''));
    dispatch(toggleNewFoodModal());
    dispatch(changeNewFood(initialState));
    dispatch(addToShoppingBag([...shoppingBagFoods, newFood]));
  };

  const closeFoodToAddModal = () => {
    dispatch(toggleNewFoodModal());
  };

  return {
    closeFoodToAddModal,
    onAddFoodClick,
  };
};
