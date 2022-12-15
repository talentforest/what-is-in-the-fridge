import tw from 'tailwind-styled-components';
import DraggableFood from './DraggableFood';
import { useAppSelector } from 'src/lib/hooks';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShoppingBagFood = () => {
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);

  return (
    <ShoppingBagBox>
      <CartIcon icon={faBagShopping} color='#72b8ff' />
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
  desktop:right-2
  desktop:bottom-4
  desktop:left-auto
  tablet:left-12
  tablet:bottom-12
  tablet:w-56
  tablet:h-56
  mobile:left-4
  mobile:bottom-2
  mobile:w-40
  mobile:h-40
`;
const CartIcon = tw(FontAwesomeIcon)`
  tablet:w-56
  tablet:h-56
  mobile:w-40
  mobile:h-40
  absolute
  scale-x-[-1]
  drop-shadow-lg
`;
const EmojiBox = tw.div`
  absolute
  tablet:gap-1
  mobile:gap-1
  bottom-3
  tablet:left-4
  mobile:left-4
  tablet:w-48
  tablet:h-24
  mobile:w-32
  mobile:h-16
  flex
  flex-wrap
  justify-center
`;

export default ShoppingBagFood;
