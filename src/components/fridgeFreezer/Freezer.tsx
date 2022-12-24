import tw from 'tailwind-styled-components';
import styles from 'styles/DoorOpen.module.css';
import Compartment from './Compartment';
import ChangeModeBtn from './ChangeModeBtn';
import ShoppingBagFood from './ShoppingBagFood';
import { useAppSelector } from 'src/lib/hooks';
import { Knob, Shelf } from './Fridge';
import { useState } from 'react';

const Freezer = () => {
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const [open, setOpen] = useState(false);

  const onFreezerOpenClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <FreezerSection className={`${styles.fridge} ${open ? styles.open : ''}`}>
        <FreezerInner className={styles.leftDoor}>
          {Object.keys(freezer.inner).map((spaceKey: string) => (
            <Compartment
              key={spaceKey}
              foods={freezer.inner[spaceKey]}
              spaceKey={spaceKey}
            />
          ))}
        </FreezerInner>
        <FreezerDoor className={styles.rightDoor} onClick={onFreezerOpenClick}>
          <div className={styles.fridgeFront}>
            <Knob />
          </div>
          {Object.keys(freezer.door).map((spaceKey: string) => (
            <Compartment
              key={spaceKey}
              foods={freezer.door[spaceKey]}
              spaceKey={spaceKey}
            >
              <Shelf />
            </Compartment>
          ))}
        </FreezerDoor>
      </FreezerSection>
      <ChangeModeBtn />
      <ShoppingBagFood />
    </>
  );
};

const FreezerSection = tw.section`
  w-full
  tablet:h-80
  mobile:h-2/5
`;
const FreezerInner = tw.div`
  absolute
  h-full
  flex
  flex-col
  justify-between
  gap-2
  desktop:w-1/2
  tablet:w-1/2
  mobile:w-1/2
  p-2
  shadow-2xl
  bg-gray-light
  border
  border-gray
`;
const FreezerDoor = tw(FreezerInner)`
`;

export default Freezer;
