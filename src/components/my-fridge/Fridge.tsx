import tw from 'tailwind-styled-components';
import styles from 'styles/DoorOpen.module.css';
import Compartment from './Compartment';
import ToggleDoorBtn from './ToggleDoorBtn';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeFridgeOpen } from 'src/lib/slice';

const Fridge = () => {
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { fridgeOpen } = useAppSelector((state) => state.doorOpen);
  const dispatch = useAppDispatch();

  const onFridgeOpenClick = () => dispatch(changeFridgeOpen());

  return (
    <div className={`${styles.fridge} ${fridgeOpen ? styles.open : ''}`}>
      {fridgeOpen && <ToggleDoorBtn onToggleDoorClick={onFridgeOpenClick} />}
      <Door className={styles.leftDoor}>
        {Object.keys(fridge.inner).map((spaceKey: string) => (
          <Compartment
            key={spaceKey}
            foods={fridge.inner[spaceKey]}
            spaceKey={spaceKey}
            type='inner'
          />
        ))}
      </Door>
      <Door className={styles.rightDoor}>
        <div className={styles.fridgeFront} onClick={onFridgeOpenClick}>
          <Knob />
        </div>
        {Object.keys(fridge.door).map((spaceKey: string) => (
          <Compartment
            key={spaceKey}
            foods={fridge.door[spaceKey]}
            spaceKey={spaceKey}
            type='door'
          >
            <Shelf />
          </Compartment>
        ))}
      </Door>
    </div>
  );
};

const Door = tw.div`
  flex
  flex-col
  justify-between
  gap-2
  p-2
  shadow-2xl
  border
  border-gray
  bg-gray-light
  tablet:p-3
`;

export const Knob = tw.div`
  w-4
  h-12
  ml-3
  mt-4
  rounded-sm
  cursor-pointer
  shadow-inner
  bg-gray-dark
  transition
  hover:bg-gray
  hover:scale-125
  tablet:h-10
  tablet:ml-6
  animate-pulse
`;

export const Shelf = tw.div`
  absolute
  right-0
  -bottom-1
  w-full
  h-10
  rounded-b-lg
  shadow-inner
  border 
  border-gray
  bg-gray-light
  opacity-50
  tablet:h-12
`;

export default Fridge;
