import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tw from 'tailwind-styled-components';

interface ICloseBtn {
  onCloseClick: () => void;
}

const CloseBtn = ({ onCloseClick }: ICloseBtn) => {
  return (
    <Btn onClick={onCloseClick} $color='bg-red-light'>
      <FontAwesomeIcon icon={faXmark} size='lg' color='#333' />
    </Btn>
  );
};

const Btn = tw.button`
  cursor-pointer
`;

export default CloseBtn;
