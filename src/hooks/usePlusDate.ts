import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeNewFood } from 'src/lib/slice/index';
import { addDay, addMonth, addYear } from 'src/utils/dateUtils';

export const usePlusDate = () => {
  const { newFood } = useAppSelector((state) => state.newFood);
  const dispatch = useAppDispatch();

  const onDatePlusClick = (
    e: React.FormEvent<HTMLButtonElement>,
    type: string
  ) => {
    e.preventDefault();
    switch (type) {
      case '하루':
        const nextday = addDay(newFood.expiryDate, 1);
        dispatch(changeNewFood({ ...newFood, expiryDate: nextday }));
        break;
      case '일주일':
        const nextWeek = addDay(newFood.expiryDate, 7);
        dispatch(changeNewFood({ ...newFood, expiryDate: nextWeek }));
        break;
      case '한달':
        const nextMonth = addMonth(newFood.expiryDate);
        dispatch(changeNewFood({ ...newFood, expiryDate: nextMonth }));
        break;
      case '일년':
        const nextYear = addYear(newFood.expiryDate);
        dispatch(changeNewFood({ ...newFood, expiryDate: nextYear }));
        break;
      default:
        break;
    }
  };

  const onDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const result = {
      ...newFood,
      expiryDate: e.currentTarget.value,
    };

    dispatch(changeNewFood(result));
  };

  return {
    onDatePlusClick,
    onDateChange,
  };
};
