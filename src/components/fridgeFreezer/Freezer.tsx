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
      {freezerOpen && (
        <CloseBtn onClick={onFreezerOpenClick}>
          <FontAwesomeIcon icon={faDoorClosed} color='#333' size='2x' />
          <span>문닫기</span>
        </CloseBtn>
      )}
      <FreezerSection
        className={`${styles.fridge} ${freezerOpen ? styles.open : ''} ${
          freezerOpen ? styles.freezer : ''
        }`}
      >
        <FreezerInner className={styles.leftDoor}>
          {Object.keys(freezer.inner).map((spaceKey: string) => (
            <Compartment
              key={spaceKey}
              foods={freezer.inner[spaceKey]}
              spaceKey={spaceKey}
            />
          ))}
        </FreezerInner>
        <FreezerDoor className={styles.rightDoor}>
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
        </FreezerDoor>
      </FreezerSection>
      <ShoppingBagFood />
    </>
  );
};

export const CloseBtn = tw.button` 
  shadow-3xl
  p-1
  h-14
  w-14
  rounded-full
  bg-yellow
  border
  border-gray-light
  flex
  flex-col
  justify-center
  items-center
  text-sm
  gap-1
  absolute
  -right-16
  top-20
`;
const FreezerSection = tw.section`
  w-full
  tablet:h-80
  mobile:h-2/5
  translate-y-16
  pt-2
  h-full
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
  tablet:p-3
  mobile:p-2
  shadow-2xl
  bg-gray-light
  border
  border-gray
`;
const FreezerDoor = tw(FreezerInner)`
`;
const FreezerKnob = tw(Knob)`
  absolute
  bottom-5

`;

export default Freezer;
