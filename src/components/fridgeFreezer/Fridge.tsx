import tw from 'tailwind-styled-components';
import styles from 'styles/DoorOpen.module.css';
import Compartment from './Compartment';
import ShoppingBagFood from './ShoppingBagFood';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeFridgeOpen } from 'src/lib/slice';
import { CloseBtn } from './Freezer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorClosed } from '@fortawesome/free-solid-svg-icons';

const Fridge = () => {
  const { fridge } = useAppSelector((state) => state.fridgeFoods);
  const { fridgeOpen } = useAppSelector((state) => state.doorOpen);
  const dispatch = useAppDispatch();

  const onFridgeOpenClick = () => {
    dispatch(changeFridgeOpen());
  };

  return (
    <>
      {fridgeOpen && (
        <CloseBtn onClick={onFridgeOpenClick}>
          <FontAwesomeIcon icon={faDoorClosed} color='#333' size='2x' />
          <span>문닫기</span>
        </CloseBtn>
      )}
      <FridgeSection
        className={`${styles.fridge} ${fridgeOpen ? styles.open : ''}`}
      >
        <FridgeInner className={styles.leftDoor}>
          {Object.keys(fridge.inner).map((spaceKey: string) => (
            <Compartment
              key={spaceKey}
              foods={fridge.inner[spaceKey]}
              spaceKey={spaceKey}
            />
          ))}
        </FridgeInner>
        <FridgeDoor className={styles.rightDoor}>
          <div className={styles.fridgeFront} onClick={onFridgeOpenClick}>
            <Knob />
          </div>
          {Object.keys(fridge.door).map((spaceKey: string) => (
            <Compartment
              key={spaceKey}
              foods={fridge.door[spaceKey]}
              spaceKey={spaceKey}
            >
              <Shelf />
            </Compartment>
          ))}
        </FridgeDoor>
      </FridgeSection>
      <ShoppingBagFood />
    </>
  );
};

const FridgeSection = tw.section`
  w-full
  tablet:min-h-[400px]
  tablet:max-h-[600px]
  tablet:h-4/5
  mobile:h-2/3
`;
const FridgeInner = tw.div`
  absolute
  h-full
  flex
  flex-col
  justify-between
  gap-2
  w-1/2
  tablet:p-3
  mobile:p-2
  shadow-2xl
  bg-gray-light
  border
  border-gray
`;
const FridgeDoor = tw(FridgeInner)`
`;
export const Knob = tw.div`
 
  cursor-pointer
  bg-gray-dark
  shadow-inner
  rounded-sm
  w-3
  h-12
  ml-5
  mt-3
`;
export const Shelf = tw.div`
  w-full
  border 
  border-gray
  absolute
  right-0
  -bottom-1
  shadow-inner
  bg-gray-light
  opacity-50
  rounded-b-lg
  h-12
`;

export default Fridge;
