import tw from 'tailwind-styled-components';
import Freezer from '../fridgeFreezer/Freezer';
import Fridge from '../fridgeFreezer/Fridge';
import Modal from '../addFood/Modal';
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
  h-[calc(100vh-theme(spacing.12))]
  mobile:pr-0
  tablet:pr-20
  flex
  flex-col
  justify-center
  items-center
  gap-1
  relative
`;

export default FridgeFreezerSection;
