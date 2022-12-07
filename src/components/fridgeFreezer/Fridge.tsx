import tw from 'tailwind-styled-components';
import Compartment from './Compartment';
import DoorShelf from './DoorShelf';
import FridgeFreezerChangeBtn from './FridgeFreezerChangeBtn';

const Fridge = () => {
  return (
    <>
      <FridgeFreezerChangeBtn btnName='냉동칸 보기' />
      <FridgeSection>
        <FridgeBox>
          <Compartment />
          <Compartment />
          <Compartment />
          <Compartment size='large' />
        </FridgeBox>
        <FridgeDoor>
          <Compartment>
            <DoorShelf />
          </Compartment>
          <Compartment size='large'>
            <DoorShelf />
          </Compartment>
          <Compartment size='large'>
            <DoorShelf />
          </Compartment>
        </FridgeDoor>
      </FridgeSection>
    </>
  );
};

const FridgeSection = tw.section`
  flex
  gap-1
`;
const FridgeBox = tw.div`
  flex
  flex-col
  justify-between
  gap-2
  w-60
  p-3
  rounded-2xl
  shadow-2xl
  bg-gray-light
`;
const FridgeDoor = tw(FridgeBox)`
`;

export default Fridge;
