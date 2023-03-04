import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tw from 'tailwind-styled-components';

interface IToggleDoorBtn {
  onToggleDoorClick: () => void;
}

const ToggleDoorBtn = ({ onToggleDoorClick }: IToggleDoorBtn) => {
  return (
    <Btn onClick={onToggleDoorClick}>
      <FontAwesomeIcon icon={faChevronLeft} size='xs' />
      <span>문닫기</span>
    </Btn>
  );
};

const Btn = tw.button` 
  absolute
  -top-11
  right-0
  w-10
  h-10
  flex
  flex-col
  items-center
  justify-center
  gap-0.5
  rounded-full
  text-[10px]
  font-bold
  shadow-3xl
  text-white
  bg-blue-dark
  tablet:h-14
  tablet:w-14
  tablet:right-2
  tablet:-top-20
`;

export default ToggleDoorBtn;
