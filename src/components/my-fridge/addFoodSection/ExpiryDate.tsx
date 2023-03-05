import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from 'src/lib/hooks';
import { Input } from './FoodIconName';
import { usePlusDate } from 'src/hooks';
import { dateType } from 'src/utils/dateUtils';
import tw from 'tailwind-styled-components';
import React from 'react';

const ExpiryDate = () => {
  const { onDatePlusClick, onDateChange } = usePlusDate();
  const { newFood } = useAppSelector((state) => state.newFood);

  return (
    <>
      <DateInput
        type='date'
        value={newFood.expiryDate}
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

const DateInput = tw(Input)`
  min-w-full
  bg-white
`;

const PlusDate = tw.div`
  mt-2
  flex
  gap-2
  text-sm
`;

const DateBtn = tw.button<{ $color: string }>`
  p-2
  rounded-3xl
  flex
  items-center
  gap-1
  text-[10px]
  shadow-lg
`;

export default ExpiryDate;
