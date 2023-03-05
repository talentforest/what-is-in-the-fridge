import tw from 'tailwind-styled-components';
import styles from 'styles/doorOpen.module.css';
import Compartment from './Compartment';
import ToggleDoorBtn from './ToggleDoorBtn';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { Knob, Shelf } from './Fridge';
import { changeFreezerOpen } from 'src/lib/slice';

const Freezer = () => {
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const { freezerOpen } = useAppSelector((state) => state.doorOpen);
  const dispatch = useAppDispatch();

  const onFreezerOpenClick = () => dispatch(changeFreezerOpen());

  return (
    <section
      className={`${styles.fridge} ${styles.freezer} ${
        freezerOpen ? styles.open : ''
      }`}
    >
      {freezerOpen && <ToggleDoorBtn onToggleDoorClick={onFreezerOpenClick} />}
      <Door className={styles.leftDoor}>
        {Object.keys(freezer.inner).map((spaceKey: string) => (
          <Compartment
            key={spaceKey}
            foods={freezer.inner[spaceKey]}
            spaceKey={spaceKey}
            type='inner'
          />
        ))}
      </Door>
      <Door className={styles.rightDoor}>
        <div className={styles.fridgeFront} onClick={onFreezerOpenClick}>
          <FreezerKnob />
        </div>
        {Object.keys(freezer.door).map((spaceKey: string) => (
          <Compartment
            key={spaceKey}
            foods={freezer.door[spaceKey]}
            spaceKey={spaceKey}
            type='door'
          >
            <Shelf />
          </Compartment>
        ))}
      </Door>
    </section>
  );
};

const Door = tw.div`
  flex
  flex-col
  justify-between
  gap-2
  p-2
  border
  border-gray
  bg-gray-light
  shadow-2xl
  tablet:p-3
`;

const FreezerKnob = tw(Knob)`
  absolute
  bottom-3
  tablet:bottom-5
`;

export default Freezer;
