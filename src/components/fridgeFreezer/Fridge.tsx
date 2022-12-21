import tw from 'tailwind-styled-components';
import Compartment from './Compartment';
import ChangeModeBtn from './ChangeModeBtn';
import ShoppingBagFood from './ShoppingBagFood';
import { useAppSelector } from 'src/lib/hooks';

const Fridge = () => {
  const { fridge } = useAppSelector((state) => state.fridgeFoods);

  return (
    <>
      <FridgeSection>
        <FridgeInner>
          {Object.keys(fridge.inner).map((spaceKey: string) => (
            <Compartment
              key={spaceKey}
              foods={fridge.inner[spaceKey]}
              spaceKey={spaceKey}
            />
          ))}
        </FridgeInner>
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
  mx-auto
  flex
  gap-0.5
  w-full
  tablet:min-h-[400px]
  tablet:max-h-[600px]
  tablet:h-4/5
  mobile:h-2/3
  tablet:mb-0

  mobile:mb-1
`;
const FridgeInner = tw.div`
  flex
  flex-col
  justify-between
  gap-2
  w-1/2
  tablet:p-3
  mobile:p-2
  rounded-2xl
  shadow-2xl
  bg-gray-light
  border
  border-gray
`;
const FridgeDoor = tw(FridgeInner)`
`;
export const Shelf = tw.div`
  w-full
  border 
  border-gray
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
