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
        icon={btnName === '냉장칸 보기' ? faArrowDown : faArrowUp}
      />
    </FridgeBtn>
  );
};

const FridgeBtn = tw.button`
  flex
  justify-center
  items-center
  gap-2
  tablet:h-16
  mobile:h-10
  bg-white-dark
  tablet:w-2/3
  mobile:w-11/12
  rounded-xl
  shadow-inner
  text-gray
  font-bold
  border
  border-gray
`;

export default FridgeFreezerChangeBtn;
