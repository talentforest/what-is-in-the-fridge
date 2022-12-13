import tw from 'tailwind-styled-components';
import Compartment from './Compartment';
import FridgeFreezerChangeBtn from './FridgeFreezerChangeBtn';
import ShoppingBagFood from './ShoppingBagFood';
import { useAppSelector } from 'src/lib/hooks';
import { Shelf } from './Fridge';

const Freezer = () => {
  const { freezer } = useAppSelector((state) => state.freezerFoods);

  return (
    <>
      <FreezerSection>
        <FreezerBox>
          {Object.keys(freezer.inner).map((spaceKey: string) => (
            <Compartment
              key={spaceKey}
              foods={freezer.inner[spaceKey]}
              spaceKey={spaceKey}
            />
          ))}
        </FreezerBox>
        <FreezerDoor>
          {Object.keys(freezer.door).map((spaceKey: string) => (
            <Compartment
              key={spaceKey}
              foods={freezer.door[spaceKey]}
              spaceKey={spaceKey}
            >
              <Shelf />
            </Compartment>
          ))}
        </FreezerDoor>
      </FreezerSection>
      <FridgeFreezerChangeBtn btnName='냉장칸 보기' />
      <ShoppingBagFood />
    </>
  );
};

const FreezerSection = tw.section`
  flex
  gap-1
  h-64
`;
const FreezerBox = tw.div`
  flex
  flex-col
  justify-between
  gap-2
  border
  w-60
  p-3
  rounded-2xl
  shadow-2xl
  bg-gray-light
`;
const FreezerDoor = tw(FreezerBox)`
`;

export default Freezer;
