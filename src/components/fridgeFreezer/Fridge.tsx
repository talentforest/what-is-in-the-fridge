import tw from 'tailwind-styled-components';
import Compartment from './Compartment';
import ChangeModeBtn from './ChangeModeBtn';
import ShoppingBagFood from './ShoppingBagFood';
import { useAppSelector } from 'src/lib/hooks';

const Fridge = () => {
  const { fridge } = useAppSelector((state) => state.fridgeFoods);

  return (
    <>
      <ChangeModeBtn btnName='냉동칸 보기' />
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
  flex
  gap-0.5
  desktop:h-4/5
  tablet:h-4/5
  tablet:max-h-[500px]
  tablet:w-fit
  mobile:h-2/3
  mobile:w-11/12
`;
const FridgeInner = tw.div`
  flex
  flex-col
  justify-between
  gap-2
  tablet:w-64
  mobile:w-1/2
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
