import tw from 'tailwind-styled-components';
import Freezer from '../fridgeFreezer/Freezer';
import Fridge from '../fridgeFreezer/Fridge';
import ShoppingBag from 'src/assets/ShoppingBag.svg';
import { useAppSelector } from 'src/lib/hooks';
import { Emoji } from 'emoji-picker-react';

const FridgeFreezerSection = () => {
  const { freezer } = useAppSelector((state) => state.freezer);
  const { shoppingBagFoods } = useAppSelector((state) => state.shoppingBag);

  return (
    <FridgeFreezer>
      {freezer ? <Freezer /> : <Fridge />}
      <AddedFoods>
        <BasketIcon />
        <EmojiBox>
          {shoppingBagFoods.map((food) => (
            <button key={food.name}>
              <Emoji unified={food.emoji} size={45} />
            </button>
          ))}
        </EmojiBox>
      </AddedFoods>
    </FridgeFreezer>
  );
};

const FridgeFreezer = tw.section`
  h-[calc(100vh-theme(spacing.12))]
  px-10
  pb-8
  flex
  flex-col
  justify-center
  items-center
  gap-1
`;
const AddedFoods = tw.div`
  absolute
  right-0
  bottom-0
  w-52
  h-52
`;
const BasketIcon = tw(ShoppingBag)`
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

export default FridgeFreezerSection;
