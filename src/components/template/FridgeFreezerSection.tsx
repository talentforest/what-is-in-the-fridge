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
      {freezerMode ? <Freezer /> : <Fridge />}
      {modal && <Modal addedFoodModal />}
    </FridgeFreezer>
  );
};

const FridgeFreezer = tw.section`
  desktop:h-[calc(100vh-theme(spacing.12))]
  tablet:h-[calc(100vh-theme(spacing.12))]
  mobile:h-[calc(100vh-theme(spacing.12))]
  flex
  flex-col
  items-center
  gap-1
  relative
  tablet:justify-center
  desktop:pb-0
  tablet:pt-0
  tablet:pb-32
  mobile:pt-5
`;

export default FridgeFreezerSection;
