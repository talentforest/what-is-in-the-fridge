import tw from 'tailwind-styled-components';
import ShoppingBag from 'src/assets/ShoppingBag.svg';
import DraggableFood from './DraggableFood';
import { useAppSelector } from 'src/lib/hooks';

const ShoppingBagFood = () => {
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);

  return (
    <ShoppingBagBox>
      <BagIcon />
      <EmojiBox>
        {shoppingBagFoods?.map((food, index) => (
          <DraggableFood key={index} food={food} />
        ))}
      </EmojiBox>
    </ShoppingBagBox>
  );
};

const ShoppingBagBox = tw.div`
  absolute
  right-0
  bottom-0
  w-52
  h-52
`;
const BagIcon = tw(ShoppingBag)`
  absolute
`;
const EmojiBox = tw.div`
  absolute
  gap-1
  pt-3
  top-20
  left-6
  w-40
  h-28
  flex
  flex-wrap
  justify-center
`;

export default ShoppingBagFood;
