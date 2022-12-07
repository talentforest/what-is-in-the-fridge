import { Emoji } from 'emoji-picker-react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeFoodInfo } from 'src/lib/slice/foodSlice';
import { foodTypes, IfoodType } from 'src/utils/foodType';
import tw from 'tailwind-styled-components';

const FoodType = () => {
  const { food } = useAppSelector((state) => state.food);
  const dispatch = useAppDispatch();

  const onClick = (foodTypes: IfoodType) => {
    const result = {
      ...food,
      type: foodTypes.type,
      emoji: foodTypes.emoji,
    };
    dispatch(changeFoodInfo(result));
  };

  return (
    <FoodTypeList>
      {foodTypes.map((foodType) => (
        <Type
          key={foodType.id}
          onClick={() => onClick(foodType)}
          $color={food.type === foodType.type}
        >
          <Emoji unified={foodType.emoji} size={20} />
          <span>{foodType.type}</span>
        </Type>
      ))}
    </FoodTypeList>
  );
};

const FoodTypeList = tw.ul`
  grid
  grid-cols-3
  gap-2
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
  text-[10px]
  shadow-md
`;

export default FoodType;
