import { Emoji } from 'emoji-picker-react';
import { useDrag } from 'react-dnd';
import { removeShoppingBagFood } from 'src/lib/slice/shoppingBagSlice';
import { useAppDispatch } from 'src/lib/hooks';
import { IFood, ISearchedFood, spaceName } from 'src/lib/slice/foodSlice';
import { showAddedFoodModal } from 'src/lib/slice/openCloseState/showAddedFoodModal';
import { changeAddedFoodInfo } from 'src/lib/slice/addedFood';
import useDragFood from 'src/hooks/useDragFood';
import tw from 'tailwind-styled-components';
import Image from 'next/image';

interface IFoodProps {
  food: IFood | ISearchedFood;
}

interface DropResult {
  name: string;
}

const DraggableFood = ({ food }: IFoodProps) => {
  const { changeFoodsState } = useDragFood();
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'spaces',
    item: food,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        changeFoodsState(dropResult.name as spaceName, item);
        dispatch(removeShoppingBagFood(item));
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  });
  const isDraggingStyle = { opacity: isDragging ? 0.2 : 1 };

  const onClick = () => {
    if (food.space === 'shoppingBag') return;
    dispatch(showAddedFoodModal());
    dispatch(changeAddedFoodInfo(food));
  };

  return (
    <DragBox ref={dragRef} style={isDraggingStyle} onClick={onClick}>
      {food.imgUrl ? (
        <ImgBox>
          <Img
            src={food.imgUrl}
            alt='Picture of Food'
            fill
            sizes='(max-width: 768px) 300px,
              (max-width: 1200px) 100px,
              30px'
            priority
            oncontextmenu='return false'
            style='-webkit-touch-callout:none'
          />
        </ImgBox>
      ) : (
        <Emoji unified={food.emoji} size={30} />
      )}
    </DragBox>
  );
};

const ImgBox = tw.div`
  relative
  w-7
  h-7
  rounded-full
  overflow-hidden
`;
const Img = tw(Image)`
  rounded-lg
  object-cover
  object-center
`;
const DragBox = tw.button`
  basis-7
  relative
  h-fit
  translate-x-0
  translate-y-0
`;

export default DraggableFood;
