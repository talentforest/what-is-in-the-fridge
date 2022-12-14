import tw from 'tailwind-styled-components';
import Compartment from './Compartment';
import FridgeFreezerChangeBtn from './FridgeFreezerChangeBtn';
import ShoppingBagFood from './ShoppingBagFood';
import { useAppSelector } from 'src/lib/hooks';

const Fridge = () => {
  const { fridge } = useAppSelector((state) => state.fridgeFoods);

  return (
    <>
      <FridgeFreezerChangeBtn btnName='냉동칸 보기' />
      <FridgeSection>
        <FridgeBox>
          {Object.keys(fridge.inner).map((spaceKey: string) => (
            <Compartment
              key={spaceKey}
              foods={fridge.inner[spaceKey]}
              spaceKey={spaceKey}
            />
          ))}
        </FridgeBox>
        <FridgeDoor>
          {Object.keys(fridge.door).map((spaceKey: string) => (
            <Compartment
              key={spaceKey}
              foods={fridge.door[spaceKey]}
              spaceKey={spaceKey}
            >
              <Shelf />
            </Compartment>
          ))}
        </FridgeDoor>
      </FridgeSection>
      <ShoppingBagFood />
    </>
  );
};

const FridgeSection = tw.section`
  flex
  gap-1
  desktop:h-4/5
  tablet:h-2/4
  mobile:h-4/5
  border
  border-red
`;
const FridgeBox = tw.div`
  flex
  flex-col
  justify-between
  gap-2
  tablet:w-64
  mobile: w-32
  p-3
  rounded-2xl
  shadow-2xl
  bg-gray-light
`;
const FridgeDoor = tw(FridgeBox)`
`;
export const Shelf = tw.div`
  w-full
  border
  absolute
  right-0
  -bottom-1
  shadow-inner
  bg-gray-light
  opacity-50
  rounded-b-lg
  h-12
`;

export default Fridge;
