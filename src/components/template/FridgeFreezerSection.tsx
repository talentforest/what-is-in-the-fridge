import tw from 'tailwind-styled-components';
import Freezer from '../fridgeFreezer/Freezer';
import Fridge from '../fridgeFreezer/Fridge';
import Modal from '../common/Modal';
import { useAppSelector } from 'src/lib/hooks';

const FridgeFreezerSection = () => {
  const { freezerMode } = useAppSelector((state) => state.freezerMode);
  const { modal } = useAppSelector((state) => state.addedFoodModal);

  return (
    <FridgeFreezer>
      <Section>{!freezerMode ? <Fridge /> : <Freezer />}</Section>
      {modal && <Modal addedFoodModal />}
    </FridgeFreezer>
  );
};

const FridgeFreezer = tw.section`
  h-[calc(100vh-theme(spacing.12))]
  relative
`;
const Section = tw.div`
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
