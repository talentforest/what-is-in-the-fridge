import tw from 'tailwind-styled-components';
import DraggableFood from './DraggableFood';
import { useAppSelector } from 'src/lib/hooks';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShoppingBagFood = () => {
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);

  return shoppingBagFoods.length !== 0 ? (
    <ShoppingBagBox>
      <CartIcon icon={faBagShopping} color='#72b8ff' />
      <EmojiBox>
        {shoppingBagFoods?.map((food) => (
          <DraggableFood key={food.id} food={food} />
        ))}
      </EmojiBox>
    </ShoppingBagBox>
  ) : (
    <></>
  );
};

const ShoppingBagBox = tw.div`
  absolute
  desktop:bottom-4
  tablet:right-2
  tablet:bottom-4
  tablet:left-auto
  mobile:left-2
  mobile:bottom-4
  tablet:w-56
  tablet:h-56
  mobile:w-40
  mobile:h-40
`;
const CartIcon = tw(FontAwesomeIcon)`
  absolute
  tablet:w-56
  tablet:h-56
  mobile:w-40
  mobile:h-40
  bottom-0
  scale-x-[-1]
  drop-shadow-lg
`;
const EmojiBox = tw.div`
  absolute
  tablet:gap-1
  mobile:gap-0.5
  tablet:left-4
  mobile:bottom-2
  mobile:left-4
  tablet:w-48
  tablet:h-20
  mobile:w-32
  mobile:h-16
  flex
  flex-wrap
  justify-center
  p-1
`;

export default ShoppingBagFood;
