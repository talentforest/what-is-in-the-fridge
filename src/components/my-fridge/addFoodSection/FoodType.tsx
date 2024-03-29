import { useSubmitFood } from 'src/hooks';
import { useAppSelector } from 'src/lib/hooks';
import { foodCategories } from 'src/utils/foodCategory';
import tw from 'tailwind-styled-components';

const FoodType = () => {
  const { newFood } = useAppSelector((state) => state.newFood);
  const { onFoodTypeClick } = useSubmitFood();

  return (
    <FoodTypeList>
      {foodCategories.map((foodType) => (
        <Type
          key={foodType.id}
          onClick={() => onFoodTypeClick(foodType)}
          $color={newFood.type === foodType.type}
        >
          <span>{foodType.type}</span>
        </Type>
      ))}
    </FoodTypeList>
  );
};

const FoodTypeList = tw.ul`
  grid
  grid-cols-3
  gap-1.5
`;

const Type = tw.li`
  cursor-pointer
  ${(p: { $color: boolean }) => (p.$color ? 'bg-green' : 'bg-white')}
  hover:bg-green
  py-2
  rounded-lg
  flex
  flex-col
  items-center
  justify-center
  text-[13px]
  shadow-md
`;

export default FoodType;
