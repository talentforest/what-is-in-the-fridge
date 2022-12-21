import { useSubmitFood } from 'src/hooks';
import { useAppSelector } from 'src/lib/hooks';
import { foodCategories } from 'src/utils/foodCategory';
import tw from 'tailwind-styled-components';

const FoodType = () => {
  const { food } = useAppSelector((state) => state.food);
  const { onFoodTypeClick } = useSubmitFood();

  return (
    <FoodTypeList>
      {foodCategories.map((foodType) => (
        <Type
          key={foodType.id}
          onClick={() => onFoodTypeClick(foodType)}
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
  py-1.5
  rounded-lg
  flex
  flex-col
  gap-2
  items-center
  justify-center
  text-[14px]
  shadow-lg
`;

export default FoodType;
