import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

interface IFoodType {
  foodType: string;
  setFoodType: (type: string) => void;
}

const FoodType = ({ foodType, setFoodType }: IFoodType) => {
  const onClick = (name: string) => {
    setFoodType(name);
  };

  return (
    <FoodTypeList>
      <Type
        onClick={() => onClick('정육,수산')}
        $color={foodType === '정육,수산'}
      >
        <Icon
          icon={icon({ name: 'drumstick-bite', style: 'solid' })}
          $color='brown'
        />
        <span>정육,수산</span>
      </Type>
      <Type
        onClick={() => onClick('과일,채소')}
        $color={foodType === '과일,채소'}
      >
        <Icon icon={icon({ name: 'carrot', style: 'solid' })} $color='orange' />
        <span>과일,채소</span>
      </Type>
      <Type
        onClick={() => onClick('계란,유제품')}
        $color={foodType === '계란,유제품'}
      >
        <Icon icon={icon({ name: 'egg', style: 'solid' })} $color='white' />
        <span>계란,유제품</span>
      </Type>
      <Type
        onClick={() => onClick('소스,잼,양념')}
        $color={foodType === '소스,잼,양념'}
      >
        <Icon icon={icon({ name: 'jar', style: 'solid' })} $color='orange' />
        <span>소스,잼,양념</span>
      </Type>
      <Type onClick={() => onClick('음료')} $color={foodType === '음료'}>
        <Icon
          icon={icon({ name: 'bottle-water', style: 'solid' })}
          $color='orange'
        />
        <span>음료</span>
      </Type>
      <Type onClick={() => onClick('곡물')} $color={foodType === '곡물'}>
        <Icon
          icon={icon({ name: 'wheat-awn', style: 'solid' })}
          $color='orange'
        />
        <span>곡물</span>
      </Type>
    </FoodTypeList>
  );
};

const FoodTypeList = tw.ul`
  grid
  grid-cols-3
  gap-2
`;
const Type = tw.li<{ $color: boolean }>`
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

const Icon = styled(FontAwesomeIcon)<{ $color: string }>`
  width: 20px;
  height: 20px;
  color: ${(props) => props.$color};
  filter: drop-shadow(1px 1px 2px rgba(0, 0, 0, 0.2));
`;

export default FoodType;
