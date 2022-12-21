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
  gap-1
  relative
`;
const Section = tw.div`
  flex 
  flex-col
  tablet:justify-center
  mx-auto
  desktop:w-1/2
  tablet:w-2/3
  mobile:w-11/12
  desktop:pt-4
  tablet:pb-20
  mobile:pt-2
  h-full
`;

export default FridgeFreezerSection;
