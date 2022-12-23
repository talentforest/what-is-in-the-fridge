import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from 'src/lib/hooks';
import { Input } from './FoodIconName';
import { dateType } from 'src/utils/dateType';
import { usePlusDate } from 'src/hooks/index';
import { changeStrDate } from 'src/utils/changeStrDate';
import tw from 'tailwind-styled-components';
import React from 'react';

const ExpiryDate = () => {
  const { onDatePlusClick, onDateChange } = usePlusDate();
  const { food } = useAppSelector((state) => state.food);

  return (
    <>
      <Input
        type='date'
        value={changeStrDate(new Date(food.expiryDate))}
        onChange={onDateChange}
      />
      <PlusDate>
        {dateType.map((item) => (
          <DateBtn
            key={item.type}
            style={{ backgroundColor: item.color }}
            onClick={(e: React.FormEvent<HTMLButtonElement>) =>
              onDatePlusClick(e, item.type)
            }
          >
            <FontAwesomeIcon icon={faPlus} />
            <span>{item.type}</span>
          </DateBtn>
        ))}
      </PlusDate>
    </>
  );
};

const PlusDate = tw.div`
  mt-2
  flex
  gap-2
  text-sm
`;
const DateBtn = tw.button<{ $color: string }>`
  py-1
  px-2
  rounded-3xl
  flex
  items-center
  gap-1
  text-[10px]
  shadow-lg
`;

export default ExpiryDate;
