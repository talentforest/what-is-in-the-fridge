import tw from 'tailwind-styled-components';
import Compartment from './Compartment';
import ChangeModeBtn from './ChangeModeBtn';
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
      <ChangeModeBtn btnName='냉장칸 보기' />
      <ShoppingBagFood />
    </>
  );
};

const FreezerSection = tw.section`
  mx-auto
  desktop:mt-10
  tablet:mt-0
  mobile:mt-10

  flex
  gap-1
  w-full
  tablet:h-80
  mobile:h-2/5
`;
const FreezerBox = tw.div`
  flex
  flex-col
  justify-between
  gap-2
  desktop:w-1/2
  tablet:w-1/2
  mobile:w-1/2
  p-2
  rounded-2xl
  shadow-2xl
  bg-gray-light
  border
  border-gray
`;
const FreezerDoor = tw(FreezerBox)`
`;

export default Freezer;
