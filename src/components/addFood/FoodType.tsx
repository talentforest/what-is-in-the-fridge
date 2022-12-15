import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeFoodInfo } from 'src/lib/slice/foodSlice';
import { foodCategories, IfoodCategory } from 'src/utils/foodCategory';
import { v4 as uuidv4 } from 'uuid';
import tw from 'tailwind-styled-components';

const FoodType = () => {
  const { food } = useAppSelector((state) => state.food);
  const dispatch = useAppDispatch();

  const onClick = (foodTypes: IfoodCategory) => {
    const result = {
      ...food,
      type: foodTypes.type,
      emoji: foodTypes.emoji,
      id: uuidv4(),
    };
    dispatch(changeFoodInfo(result));
  };

  return (
    <FoodTypeList>
      {foodCategories.map((foodType) => (
        <Type
          key={foodType.id}
          onClick={() => onClick(foodType)}
          $color={food.type === foodType.type}
        >
          <span>{foodType.type}</span>
        </Type>
      ))}
    </FoodTypeList>
  );
};

const FoodTypeList = tw.ul`
  grid
  grid-cols-2
  gap-1.5
`;
const Type = tw.li`
  cursor-pointer
  ${(p: { $color: boolean }) => (p.$color ? 'bg-green' : 'bg-yellow-light')}
hover:bg-green
  p-2
  rounded-lg
  flex
  flex-col
  gap-2
  items-center
  justify-center
  text-xs
  shadow-lg
  
`;

export default FoodType;
