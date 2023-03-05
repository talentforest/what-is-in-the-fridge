import { IFood } from 'src/lib/slice/newFoodSlice';
import { useDrop } from 'react-dnd';
import DraggableFood from './DraggableFood';
import tw from 'tailwind-styled-components';

interface ICompartmentProps {
  children?: any;
  foods: IFood[];
  spaceKey: string;
  type: 'inner' | 'door';
}

const Compartment = ({
  children,
  foods,
  spaceKey,
  type,
}: ICompartmentProps) => {
  const [{ canDrop, isOver }, drop] = useDrop({
    accept: 'spaces',
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
          <DraggableFood key={index} food={food} type={type} />
        ))}
      </FoodList>
    </Space>
  );
};

const Space = tw.div`
  overflow-hidden
  mx-auto
  p-0.5
  tablet:p-1
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
  flex
  flex-wrap-reverse
  tablet:gap-1
`;

export default Compartment;
