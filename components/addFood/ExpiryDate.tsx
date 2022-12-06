import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { IFoodProps } from './FoodType';
import usePlusDate from '../../hooks/usePlusDate';
import styled from 'styled-components';

const plusDateTypes = [
  { type: '하루', color: '#c2baff' },
  { type: '일주일', color: '#ffc1c1' },
  { type: '한달', color: '#a4deca' },
  { type: '일년', color: '#ffb87a' },
];

const ExpiryDate = ({ food, setFood }: IFoodProps) => {
  const { onDatePlusClick, onDateChange } = usePlusDate({
    food,
    setFood,
  });

  return (
    <>
      <ExpiryDateInput
        type='date'
        value={food.expiryDate}
        onChange={onDateChange}
      />
      <PlusDate>
        {plusDateTypes.map((item) => (
          <DateBtn
            key={item.type}
            $color={item.color}
            onClick={(e) => onDatePlusClick(e, item.type)}
          >
            <FontAwesomeIcon icon={icon({ name: 'plus', style: 'solid' })} />
            <span>{item.type}</span>
          </DateBtn>
        ))}
      </PlusDate>
    </>
  );
};

const ExpiryDateInput = styled.input`
  width: 100%;
  border-radius: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  font-size: 14px;
  padding: 5px;
`;
const PlusDate = styled.div`
  padding: 3px;
  margin-top: 5px;
  display: flex;
  gap: 5px;
  font-size: 12px;
`;
const DateBtn = styled.button<{ $color: string }>`
  padding: 4px 8px;
  border-radius: 20px;
  background-color: ${(props) => props.$color};
  display: flex;
  align-items: center;
  gap: 2px;
  font-size: 10px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.2);
  svg {
    width: 8px;
    height: 8px;
  }
`;

export default ExpiryDate;
