import tw from 'tailwind-styled-components';

const DoorShelf = () => {
  return <Shelf />;
};

const Shelf = tw.div`
  shadow-inner
  bg-gray-light
  opacity-50
  rounded-b-lg
  h-12
`;

export default DoorShelf;
