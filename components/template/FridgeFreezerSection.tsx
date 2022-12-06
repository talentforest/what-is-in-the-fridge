import { useState } from 'react';
import tw from 'tailwind-styled-components';
import Freezer from '../fridgeFreezer/Freezer';
import Fridge from '../fridgeFreezer/Fridge';

const FridgeFreezerSection = () => {
  const [showFreezer, setShowFreezer] = useState(false);
  return (
    <FridgeFreezer>
      {showFreezer ? (
        <Freezer setShowFreezer={setShowFreezer} />
      ) : (
        <Fridge setShowFreezer={setShowFreezer} />
      )}
    </FridgeFreezer>
  );
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
