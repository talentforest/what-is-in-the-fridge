import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'src/lib/hooks';
import { changeMode } from 'src/lib/slice/freezerModeReducer';
import tw from 'tailwind-styled-components';

interface IFridgeFreezerChangeBtnProps {
  btnName: string;
}

const FridgeFreezerChangeBtn = ({ btnName }: IFridgeFreezerChangeBtnProps) => {
  const dispatch = useAppDispatch();

  return (
    <FridgeBtn onClick={() => dispatch(changeMode())}>
      <span>{btnName}</span>
      <FontAwesomeIcon
        icon={btnName === '냉장칸 보기' ? faArrowUp : faArrowDown}
      />
    </FridgeBtn>
  );
};

const FridgeBtn = tw.button`
  flex
  justify-center
  items-center
  gap-2
  h-12
  bg-white-dark
  tablet:w-[calc(2*theme(spacing.64))]
  mobile:w-[calc(2*theme(spacing.36))]
  rounded-xl
  shadow-inner
  text-gray
  font-bold
  text-sm
`;

export default FridgeFreezerChangeBtn;
