import tw from 'tailwind-styled-components';
import DraggableFood from './DraggableFood';
import { useAppSelector } from 'src/lib/hooks';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShoppingBagFood = () => {
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);

  return (
    <ShoppingBagBox>
      <CartIcon icon={faBagShopping} color='#c2baff' />
      <EmojiBox>
        {shoppingBagFoods?.map((food) => (
          <DraggableFood key={food.id} food={food} />
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
const CartIcon = tw(FontAwesomeIcon)`
  tablet:w-48
  tablet:h-48
  mobile:w-40
  mobile:h-40
  absolute
  scale-x-[-1]
  stroke-2
  stroke-orange
  drop-shadow-lg
`;
const EmojiBox = tw.div`
  absolute
  tablet:gap-1
  mobile:gap-0
  pt-1
  bottom-3
  tablet:left-3
  mobile:left-4
  tablet:w-36
  tablet:h-20
  mobile:w-32
  mobile:h-16
  flex
  flex-wrap
  justify-center
`;

export default ShoppingBagFood;
