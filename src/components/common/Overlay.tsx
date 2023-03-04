import tw from 'tailwind-styled-components';

interface IOverlayProps {
  closeModal: () => void;
}

const Overlay = ({ closeModal }: IOverlayProps) => {
  return <Box onClick={closeModal} />;
};

const Box = tw.div`
  z-20  
  absolute
  top-0
  right-0
  left-0
  h-screen
  opacity-50
  cursor-pointer
  bg-gray-dark
`;

export default Overlay;
