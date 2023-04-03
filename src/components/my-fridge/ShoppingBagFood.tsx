import tw from 'tailwind-styled-components';
import DraggableFood from './DraggableFood';
import { useAppSelector } from 'src/lib/hooks';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ShoppingBagFood = () => {
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);

  return shoppingBagFoods.length !== 0 ? (
    <ShoppingBag>
      <Icon icon={faBagShopping} strokeWidth={4} />
      <FoodList>
        {shoppingBagFoods?.map((food) => (
          <DraggableFood key={food.id} food={food} type='shoppingBag' />
        ))}
      </FoodList>
    </ShoppingBag>
  ) : (
    <></>
  );
};

const ShoppingBag = tw.div`
  absolute
  right-0
  bottom-2
  w-40
  h-40
  tablet:w-56
  tablet:h-56
  tablet:bottom-8
  desktop:bottom-4
  desktop:right-0
`;

const Icon = tw(FontAwesomeIcon)`
  absolute
  w-40
  h-40
  drop-shadow-lg
  text-yellow
  stroke-blue-dark
  tablet:w-56
  tablet:h-56
`;

const FoodList = tw.div`
  absolute
  left-4
  bottom-2
  flex
  flex-wrap
  justify-center
  w-32
  h-16
  p-1
  gap-0.5
  tablet:w-48
  tablet:h-20
  tablet:bottom-6
  tablet:left-4
  tablet:gap-2
`;

export default ShoppingBagFood;
