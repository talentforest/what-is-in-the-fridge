import tw from 'tailwind-styled-components';
import Freezer from '../fridgeFreezer/Freezer';
import Fridge from '../fridgeFreezer/Fridge';
import Modal from '../common/Modal';
import { useAppSelector } from 'src/lib/hooks';

const FridgeFreezerSection = () => {
  const { modal } = useAppSelector((state) => state.addedFoodModal);
  const { freezerOpen, fridgeOpen } = useAppSelector((state) => state.doorOpen);

  return (
    <FridgeFreezer>
      <Section>
        {!fridgeOpen && <Freezer />}
        {!freezerOpen && <Fridge />}
      </Section>
      {modal && <Modal addedFoodModal />}
    </FridgeFreezer>
  );
};

const FridgeFreezer = tw.section`
  h-[calc(100vh-theme(spacing.12))]
  relative
`;
const Section = tw.div`
 relative
  mx-auto
  flex 
  flex-col
  justify-center
  items-center
  h-full
  desktop:w-1/2
  tablet:w-2/3
  mobile:w-11/12
`;

export default FridgeFreezerSection;
