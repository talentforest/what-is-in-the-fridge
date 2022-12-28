import { useAppSelector } from 'src/lib/hooks';
import { ISearchedFood } from 'src/lib/slice/foodSlice';

const useCheckExistFood = () => {
  const { food } = useAppSelector((state) => state.food);
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);

  const msg = (type: string, side: string, space: string) => {
    const sideName = side === 'door' ? '문쪽' : '안쪽';
    return `${type} ${sideName} ${space}에 같은 이름의 식료품이 있습니다. 한번 확인해보시겠어요?`;
  };

  const isShoppingBagFood = (addFood: ISearchedFood) => {
    if (shoppingBagFoods.some((item) => item.name === addFood.name)) {
      return true;
    }
  };

  const isShoppingBagFoodAlert = (addFood: ISearchedFood) => {
    if (shoppingBagFoods.some((item) => item.name === addFood.name)) {
      return alert('쇼핑백에 이미 추가되었어요!');
    }
  };

  const isFridgeFood = (addFood: ISearchedFood) => {
    return Object.keys(fridge).map((side) => {
      return Object.keys(fridge[side]).map((spaceName) => {
        if (fridge[side][spaceName].some((item) => item.name === addFood.name))
          return 'exist';
      });
    });
  };

  const isFreezerFood = (addFood: ISearchedFood) => {
    return Object.keys(freezer).map((side) => {
      return Object.keys(freezer[side]).map((spaceName) => {
        if (freezer[side][spaceName].some((item) => item.name === addFood.name))
          return 'exist';
      });
    });
  };

  const isFridgeFoodAlert = (addFood: ISearchedFood) => {
    Object.keys(fridge).map((side) => {
      Object.keys(fridge[side]).map((spaceName) => {
        if (fridge[side][spaceName].some((item) => item.name === addFood.name))
          return alert(msg('냉장실', side, `${spaceName}`));
      });
    });
  };

  const isFreezerFoodAlert = (addFood: ISearchedFood) => {
    Object.keys(freezer).map((side) => {
      Object.keys(freezer[side]).map((spaceName) => {
        if (freezer[side][spaceName].some((item) => item.name === addFood.name))
          return alert(msg('냉동실', side, `${spaceName}`));
      });
    });
  };

  const isExistedFood = (food: ISearchedFood) => {
    const existShoppingBag = isShoppingBagFood(food as ISearchedFood);
    const existFridge = isFridgeFood(food as ISearchedFood)
      .map((item) => item.some((item) => item === 'exist'))
      .some((item) => item === true);
    const existFreezer = isFreezerFood(food as ISearchedFood)
      .map((item) => item.some((item) => item === 'exist'))
      .some((item) => item === true);

    return existShoppingBag || existFridge || existFreezer;
  };

  return {
    isExistedFood,
    isShoppingBagFood,
    isShoppingBagFoodAlert,
    isFridgeFood,
    isFreezerFood,
    isFridgeFoodAlert,
    isFreezerFoodAlert,
  };
};

export default useCheckExistFood;
