import tw from 'tailwind-styled-components';
import styles from 'styles/DoorOpen.module.css';
import Compartment from './Compartment';
import ShoppingBagFood from './ShoppingBagFood';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { Knob, Shelf } from './Fridge';
import { changeFreezerOpen } from 'src/lib/slice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';

const Freezer = () => {
  const { freezer } = useAppSelector((state) => state.freezerFoods);
  const { freezerOpen } = useAppSelector((state) => state.doorOpen);
  const dispatch = useAppDispatch();

  const onFreezerOpenClick = () => {
    dispatch(changeFreezerOpen());
  };

  return (
    <>
      <section
        className={`${styles.fridge} ${styles.freezer} ${
          freezerOpen ? styles.open : ''
        }`}
      >
        {freezerOpen && (
          <CloseBtn onClick={onFreezerOpenClick}>
            <FontAwesomeIcon icon={faDoorClosed} color='#333' />
            <span>문닫기</span>
          </CloseBtn>
        )}
        <Door className={styles.leftDoor}>
          {Object.keys(freezer.inner).map((spaceKey: string) => (
            <Compartment
              key={spaceKey}
              foods={freezer.inner[spaceKey]}
              spaceKey={spaceKey}
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
            >
              <Shelf />
            </Compartment>
          ))}
        </Door>
      </section>
      <ShoppingBagFood />
    </>
  );
};

export const CloseBtn = tw.button` 
  shadow-3xl
  p-1
  mobile:w-12
  mobile:h-12
  tablet:h-14
  tablet:w-14
  rounded-full
  bg-yellow
  border
  border-gray-light
  flex
  flex-col
  justify-center
  items-center
  text-[10px]
  gap-1
  absolute
  tablet:right-2
  tablet:-top-20
  mobile:-top-14
  mobile:right-2
`;
const Door = tw.div`
  flex
  flex-col
  justify-between
  gap-2
  tablet:p-3
  mobile:p-2
  shadow-2xl
  bg-gray-light
  border
  border-gray
`;
const FreezerKnob = tw(Knob)`
  absolute
  mobile:bottom-3
  tablet:bottom-5
`;

export default Freezer;
