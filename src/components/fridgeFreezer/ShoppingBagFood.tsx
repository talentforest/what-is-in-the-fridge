import tw from 'tailwind-styled-components';
import Cart from 'src/assets/Cart.svg';
import DraggableFood from './DraggableFood';
import { useAppSelector } from 'src/lib/hooks';

const ShoppingBagFood = () => {
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);

  return (
    <ShoppingBagBox>
      <CartIcon />
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
  right-2
  bottom-2
  tablet:w-48
  tablet:h-48
  mobile:w-40
  mobile:h-40
`;
const CartIcon = tw(Cart)`
  mt-3
  absolute
  scale-x-[-1]
  stroke-2
  stroke-green
  fill-white-dark
  drop-shadow-lg
`;
const EmojiBox = tw.div`
  absolute
  gap-1
  pt-1
  top-6
  left-3
  w-36
  h-20
  flex
  flex-wrap
  justify-center
`;

export default ShoppingBagFood;
