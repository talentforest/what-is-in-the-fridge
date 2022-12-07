import { IFood } from '../template/AddFoodSection';
import { Emoji } from 'emoji-picker-react';
import tw from 'tailwind-styled-components';

export interface IFoodProps {
  food: IFood;
  setFood: (type: IFood) => void;
}

interface IfoodType {
  id: number;
  type: string;
  emoji: string;
}

const foodTypes = [
  { id: 1, type: '정육,수산', emoji: '1f969' },
  { id: 2, type: '과일,채소', emoji: '1f9c5' },
  { id: 3, type: '계란,유제품', emoji: '1f95a' },
  { id: 4, type: '소스,잼,양념', emoji: '1f96b' },
  { id: 5, type: '음료', emoji: '1f95b' },
  { id: 6, type: '곡물', emoji: '1f35e' },
];

const FoodType = ({ food, setFood }: IFoodProps) => {
  const { type } = food;

  const onClick = (foodTypes: IfoodType) => {
    setFood({ ...food, type: foodTypes.type, emoji: foodTypes.emoji });
  };

  return (
    <FoodTypeList>
      {foodTypes.map((foodType) => (
        <Type
          key={foodType.id}
          onClick={() => onClick(foodType)}
          $color={type === foodType.type}
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
