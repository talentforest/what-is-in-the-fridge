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
      <section className={`${styles.fridge} ${fridgeOpen ? styles.open : ''}`}>
        {fridgeOpen && (
          <CloseBtn onClick={onFridgeOpenClick}>
            <FontAwesomeIcon icon={faDoorClosed} color='#333' />
            <span>문닫기</span>
          </CloseBtn>
        )}
        <Door className={styles.leftDoor}>
          {Object.keys(fridge.inner).map((spaceKey: string) => (
            <Compartment
              key={spaceKey}
              foods={fridge.inner[spaceKey]}
              spaceKey={spaceKey}
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
export const Knob = tw.div`
  cursor-pointer
  bg-gray-dark
  shadow-inner
  rounded-md
  tablet:w-3
  tablet:h-12
  mobile:w-2
  mobile:h-6
  tablet:ml-6
  mobile:ml-3
  mt-4
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
  mobile:h-10
  tablet:h-12
`;

export default Fridge;
