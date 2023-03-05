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
  -top-8
  right-0
  py-1.5
  px-3
  flex  
  items-center
  justify-center
  gap-1
  rounded-full
  text-[10px]
  font-bold
  shadow-2xl
  text-white
  bg-blue-dark
  tablet:py-2.5
  tablet:px-4
  tablet:gap-2
  tablet:text-md
  tablet:-top-12
  tablet:right-2
`;

export default ToggleDoorBtn;
