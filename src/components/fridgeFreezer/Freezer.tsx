import tw from 'tailwind-styled-components';
import Compartment from './Compartment';
import DoorShelf from './DoorShelf';
import FridgeFreezerChangeBtn from './FridgeFreezerChangeBtn';

const Freezer = () => {
  return (
    <>
      <FreezerSection>
        <FreezerBox>
          <Compartment />
          <Compartment size='large' />
        </FreezerBox>
        <FreezerDoor>
          <Compartment size='medium'>
            <DoorShelf />
          </Compartment>
          <Compartment size='medium'>
            <DoorShelf />
          </Compartment>
        </FreezerDoor>
      </FreezerSection>
      <FridgeFreezerChangeBtn btnName='냉장칸 보기' />
    </>
  );
};

const FreezerSection = tw.section`
  flex
  gap-1
`;
const FreezerBox = tw.button`
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
