import { useAppSelector } from 'src/lib/hooks';
import { Input } from './FoodIconName';
import { useSubmitFood } from 'src/hooks';
import tw from 'tailwind-styled-components';

const FoodQuantity = () => {
  const { food } = useAppSelector((state) => state.food);
  const { onQuantityChange } = useSubmitFood();

  return (
    <>
      <Box>
        <Name>수량</Name>
        <Input
          type='number'
          placeholder='수량을 적어주세요.'
          value={food.quantity}
          onChange={onQuantityChange}
        />
        개
      </Box>
      <Desc>숫자만 입력가능해요.😊</Desc>
    </>
  );
};

const Box = tw.div`
  flex
  justify-between
  items-center
  gap-2
  text-[14px]
  mb-2
`;
const Name = tw.span`
  rounded-sm
  w-1/5
`;
export const Desc = tw.span`
  text-[13px]
  text-orange
`;
export default FoodQuantity;
