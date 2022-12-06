import { IFoodProps } from '../components/addFood/FoodType';
import { changeStrDate } from '../utils/changeStrDate';

const usePlusDate = ({ food, setFood }: IFoodProps) => {
  function addDay(date: string, days: number) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return changeStrDate(result);
  }
  function addMonth(date: string) {
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1);
    return changeStrDate(result);
  }
  function addYear(date: string) {
    const result = new Date(date);
    result.setFullYear(result.getFullYear() + 1);
    return changeStrDate(result);
  }

  const onDatePlusClick = (
    e: React.FormEvent<HTMLButtonElement>,
    type: string
  ) => {
    e.preventDefault();
    if (type === '하루') {
      const nextday = addDay(food.expiryDate, 1);
      const result = { ...food, expiryDate: nextday };
      setFood(result);
    }
    if (type === '일주일') {
      const nextWeek = addDay(food.expiryDate, 7);
      const result = { ...food, expiryDate: nextWeek };
      setFood(result);
    }
    if (type === '한달') {
      const nextMonth = addMonth(food.expiryDate);
      const result = { ...food, expiryDate: nextMonth };
      setFood(result);
    }
    if (type === '일년') {
      const nextYear = addYear(food.expiryDate);
      const result = { ...food, expiryDate: nextYear };
      setFood(result);
    }
  };

  const onDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    const result = { ...food, expiryDate: e.currentTarget.value };
    setFood(result);
  };

  return {
    onDatePlusClick,
    onDateChange,
  };
};

export default usePlusDate;
