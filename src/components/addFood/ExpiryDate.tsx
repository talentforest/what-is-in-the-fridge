import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useAppSelector } from 'src/lib/hooks';
import { dateType } from 'src/utils/dateType';
import usePlusDate from 'src/hooks/usePlusDate';
import styled from 'styled-components';
import { Input } from './FoodIconName';

const ExpiryDate = () => {
  const { onDatePlusClick, onDateChange } = usePlusDate();
  const { food } = useAppSelector((state) => state.food);

  return (
    <>
      <Input type='date' value={food.expiryDate} onChange={onDateChange} />
      <PlusDate>
        {dateType.map((item) => (
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

const PlusDate = styled.div`
  padding: 3px;
  margin-top: 8px;
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
