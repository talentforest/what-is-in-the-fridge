import tw from 'tailwind-styled-components';
import Cart from 'src/assets/Cart.svg';
import DraggableFood from './DraggableFood';
import { useAppSelector } from 'src/lib/hooks';

const ShoppingBagFood = () => {
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);

  return shoppingBagFoods.length !== 0 ? (
    <ShoppingBagBox>
      <CartIcon />
      <EmojiBox>
        {shoppingBagFoods?.map((food, index) => (
          <DraggableFood key={index} food={food} />
        ))}
      </EmojiBox>
    </ShoppingBagBox>
  ) : (
    <></>
  );
};

const ShoppingBagBox = tw.div`
  absolute
  right-2
  bottom-0
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
  stroke-orange
  fill-orange-light
  drop-shadow-lg
`;
const EmojiBox = tw.div`
  absolute
  tablet:gap-1
  mobile:gap-0
  pt-1
  top-6
  tablet:left-3
  mobile:left-1
  tablet:w-36
  tablet:h-20
  mobile:w-32
  mobile:h-16
  flex
  flex-wrap
  justify-center
`;

export default ShoppingBagFood;
