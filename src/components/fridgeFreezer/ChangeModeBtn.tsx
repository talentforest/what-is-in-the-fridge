import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch } from 'src/lib/hooks';
import { changeMode } from 'src/lib/slice/freezerModeReducer';
import tw from 'tailwind-styled-components';

interface IChangeModeBtnProps {
  btnName: string;
}

const ChangeModeBtn = ({ btnName }: IChangeModeBtnProps) => {
  const dispatch = useAppDispatch();

  return (
    <ChangeBtn onClick={() => dispatch(changeMode())}>
      <span>{btnName}</span>
      <FontAwesomeIcon
        icon={btnName === '냉장칸 보기' ? faArrowDown : faArrowUp}
      />
    </ChangeBtn>
  );
};

const ChangeBtn = tw.button`
  tablet:h-10
  mobile:h-8
  w-full
  my-1
  mx-auto
  flex
  justify-center
  items-center
  bg-white-dark
  gap-2
  rounded-xl
  shadow-inner
  text-gray
  font-bold
  border
  border-gray
`;

export default ChangeModeBtn;
