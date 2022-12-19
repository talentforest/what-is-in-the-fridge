import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeFoodInfo } from 'src/lib/slice/foodSlice';
import { addToShoppingBag } from 'src/lib/slice/shoppingBagSlice';
import { showFoodModal } from 'src/lib/slice/openCloseState/showFoodModalSlice';
import { changeStrDate } from 'src/utils/changeStrDate';
import { searchFood } from 'src/lib/slice/searchFood';

const useAddFood = () => {
  const { food } = useAppSelector((state) => state.food);
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);
  const dispatch = useAppDispatch();

  const initialState = {
    id: '',
    type: '',
    name: '',
    space: 'shoppingBag',
    emoji: '1f34b',
    expiryDate: changeStrDate(new Date()),
    quantity: '',
  };

  const onAddFoodClick = () => {
    if (shoppingBagFoods.length >= 8) {
      alert('장바구니에 식료품을 8개 넣을 수 없습니다.');
      dispatch(showFoodModal());
      return;
    }
    dispatch(showFoodModal());
    dispatch(changeFoodInfo(initialState));
    dispatch(addToShoppingBag([...shoppingBagFoods, food]));
    dispatch(searchFood({}));
  };

  const closeFoodModal = () => {
    dispatch(showFoodModal());
    dispatch(changeFoodInfo(initialState));
    dispatch(searchFood({}));
  };

  return {
    closeFoodModal,
    onAddFoodClick,
  };
};

export default useAddFood;
