import { Emoji } from 'emoji-picker-react';
import tw from 'tailwind-styled-components';
import { IFood } from '../template/AddFoodSection';
import { useDrop } from 'react-dnd';
import DraggableFood from './DraggableFood';

interface ICompartmentProps {
  children?: any;
  foods: IFood[];
  spaceKey: string;
}

const Compartment = ({ children, foods, spaceKey }: ICompartmentProps) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'space',
    drop: () => ({
      name: spaceKey,
    }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });
  const isDragActive = canDrop && isOver;

  return (
    <Space
      ref={drop}
      style={{
        scale: isDragActive ? '1.05' : '1',
        transition: isDragActive ? 'scale 0.2s ease-out' : '1',
      }}
    >
      {children}
      <FoodList>
        {foods?.map((food: IFood, index) => (
          <DraggableFood key={index} food={food} />
        ))}
      </FoodList>
    </Space>
  );
};

const Space = tw.div`
  w-full
  flex-1
  bg-white
  rounded-lg
  shadow-inner
  flex
  flex-col
  justify-end
  cursor-pointer
`;
const FoodList = tw.ul`
  grid
  grid-cols-7

`;

export default Compartment;
