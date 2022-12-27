import { useAppSelector } from 'src/lib/hooks';
import { ISearchedFood } from 'src/lib/slice/foodSlice';

const useCheckExistFood = () => {
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const { fridge } = useAppSelector((state) => state.fridgeFoods);

  const msg = (type: string, side: string, space: string) => {
    const sideName = side === 'door' ? '문쪽' : '안쪽';
    return `${type} ${sideName} ${space}에 같은 이름의 식료품이 있습니다. 한번 확인해보시겠어요?`;
  };

  const isFridgeFood = (bookmarkFood: ISearchedFood) => {
    Object.keys(fridge).map((side) => {
      Object.keys(fridge[side]).map((spaceName) => {
        if (
          fridge[side][spaceName].some(
            (item) => item.name === bookmarkFood.name
          )
        )
          return alert(msg('냉장실', side, `${spaceName}`));
      });
    });
  };

  const isFreezerFood = (bookmarkFood: ISearchedFood) => {
    Object.keys(freezer).map((side) => {
      Object.keys(freezer[side]).map((spaceName) => {
        if (
          freezer[side][spaceName].some(
            (item) => item.name === bookmarkFood.name
          )
        )
          return alert(msg('냉동실', side, `${spaceName}`));
      });
    });
  };

  return {
    isFridgeFood,
    isFreezerFood,
  };
};

export default useCheckExistFood;
