import tw from 'tailwind-styled-components';
import Freezer from '../fridgeFreezer/Freezer';
import Fridge from '../fridgeFreezer/Fridge';
import { useAppSelector } from 'src/lib/hooks';

const FridgeFreezerSection = () => {
  const { freezer } = useAppSelector((state) => state.freezer);

  return <FridgeFreezer>{freezer ? <Freezer /> : <Fridge />}</FridgeFreezer>;
};

const FridgeFreezer = tw.section`
  h-[calc(100vh-theme(spacing.12))]
  px-10
  pb-8
  flex
  flex-col
  justify-center
  items-center
  gap-1
`;

export default FridgeFreezerSection;
