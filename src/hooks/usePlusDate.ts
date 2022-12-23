import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeFoodInfo } from 'src/lib/slice/index';

export const usePlusDate = () => {
  const { food } = useAppSelector((state) => state.food);
  const dispatch = useAppDispatch();

  function addDay(date: string, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result.toLocaleDateString();
  }
  function addMonth(date: string) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1);
    return result.toLocaleDateString();
  }
  function addYear(date: string) {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + 1);
    return result.toLocaleDateString();
  }

  const onDatePlusClick = (
    e: React.FormEvent<HTMLButtonElement>,
    type: string
  ) => {
    e.preventDefault();
    switch (type) {
      case '하루':
        const nextday = addDay(food.expiryDate, 1);
        dispatch(changeFoodInfo({ ...food, expiryDate: nextday }));
        break;
      case '일주일':
        const nextWeek = addDay(food.expiryDate, 7);
        dispatch(changeFoodInfo({ ...food, expiryDate: nextWeek }));
        break;
      case '한달':
        const nextMonth = addMonth(food.expiryDate);
        dispatch(changeFoodInfo({ ...food, expiryDate: nextMonth }));
        break;
      case '일년':
        const nextYear = addYear(food.expiryDate);
        dispatch(changeFoodInfo({ ...food, expiryDate: nextYear }));
        break;
      default:
        break;
    }
  };

  const onDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const result = {
      ...food,
      expiryDate: new Date(e.currentTarget.value).toLocaleDateString(),
    };

    dispatch(changeFoodInfo(result));
  };

  return {
    onDatePlusClick,
    onDateChange,
  };
};
