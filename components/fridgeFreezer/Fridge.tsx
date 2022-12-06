import tw from 'tailwind-styled-components';
import Compartment from './Compartment';
import DoorShelf from './\bDoorShelf';
import FridgeFreezerChangeBtn from './FridgeFreezerChangeBtn';

interface IFridgeProps {
  setShowFreezer: (show: boolean) => void;
}

const Fridge = ({ setShowFreezer }: IFridgeProps) => {
  const onShowFreezerClick = () => {
    setShowFreezer(true);
  };

  return (
    <>
      <FridgeFreezerChangeBtn
        btnName='냉동칸 보기'
        onChangeClick={onShowFreezerClick}
      />
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

const FreezerBtn = tw.button`
  flex
  justify-center
  items-center
  gap-2
  h-12
  bg-white-dark
  w-[calc(2*theme(spacing.60))]
  rounded-xl
  shadow-inner
  text-gray
  font-bold
  text-sm
`;
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
