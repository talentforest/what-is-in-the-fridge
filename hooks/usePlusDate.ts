import { IExpiryDate } from '../components/addFood/ExpiryDate';
import { changeStrDate } from '../utils/changeStrDate';

const usePlusDate = ({ expiryDate, setExpiryDate }: IExpiryDate) => {
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
      const nextday = addDay(expiryDate, 1);
      setExpiryDate(nextday);
    }
    if (type === '일주일') {
      const nextWeek = addDay(expiryDate, 7);
      setExpiryDate(nextWeek);
    }
    if (type === '한달') {
      const nextMonth = addMonth(expiryDate);
      setExpiryDate(nextMonth);
    }
    if (type === '일년') {
      const nextYear = addYear(expiryDate);
      setExpiryDate(nextYear);
    }
  };

  const onDateChange = (e: React.FormEvent<HTMLInputElement>) => {
    setExpiryDate(e.currentTarget.value);
  };

  return {
    onDatePlusClick,
    onDateChange,
  };
};

export default usePlusDate;
