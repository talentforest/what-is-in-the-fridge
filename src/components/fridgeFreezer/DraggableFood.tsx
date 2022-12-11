import { Emoji } from 'emoji-picker-react';
import { useDrag } from 'react-dnd';
import { removeShoppingBagFood } from 'src/lib/slice/shoppingBagSlice';
import { useAppDispatch } from 'src/lib/hooks';
import { IFood } from 'src/lib/slice/foodSlice';
import { useState } from 'react';
import useDragItem from 'src/hooks/useDragItem';
import styled from 'styled-components';

interface IFoodProps {
  food: IFood;
}

interface DropResult {
  name: string;
}

const DraggableFood = ({ food }: IFoodProps) => {
  const [openFoodInfo, setOpenFoodInfo] = useState(false);
  const { changeFoodsState } = useDragItem();
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'spaces',
    item: food,
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<DropResult>();
      if (item && dropResult) {
        changeFoodsState(dropResult.name, item);
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
    setOpenFoodInfo((prev) => !prev);
    setTimeout(() => {
      setOpenFoodInfo((prev) => !prev);
    }, 3000);
  };

  return (
    <DragBox
      ref={dragRef}
      style={isDraggingStyle}
      onClick={onClick}
      $openFoodInfo={openFoodInfo}
    >
      <Emoji unified={food.emoji} size={30} />
      {openFoodInfo && (
        <Box $openFoodInfo={openFoodInfo} className={'comment'}>
          <ul>
            <li>
              <span>카테고리</span>
              <span>{food.type}</span>
            </li>
            <li>
              <span>이름</span>
              <span>{food.name}</span>
            </li>
            <li>
              <span>수량</span>
              <span>{food.quantity}</span>
            </li>
            <li>
              <span>유통기한</span>
              <span>{new Date(food.expiryDate).toLocaleDateString()}</span>
            </li>
          </ul>
        </Box>
      )}
    </DragBox>
  );
};

const Box = styled.div<{ $openFoodInfo: boolean }>`
  &.comment {
    padding: 8px;
    position: absolute;
    bottom: 40px;
    left: 20px;
    width: 180px;
    background: #6ad39b;
    border-radius: 0.4em;
    box-shadow: 1px 2px 5px rgba(0, 0, 0, 0.2);
  }
  &.comment:after {
    content: '';
    position: absolute;
    bottom: 20px;
    left: 50%;
    width: 0;
    height: 0;
    border: 15px solid transparent;
    border-top-color: #6ad39b;
    border-bottom: 0;
    border-left: 0;
    margin-left: -70.5px;
    margin-bottom: -35px;
  }
  ul {
    font-size: 14px;
    display: flex;
    flex-direction: column;
    gap: 3px;
    li {
      display: flex;
      span:first-child {
        text-align: start;
        width: 40%;
        color: #888;
      }
      span:last-child {
        font-size: 13px;
        background-color: #fefefe;
        text-align: center;
        border-radius: 20px;
        min-width: 20%;
        padding: 2px 8px;
        color: #333;
      }
    }
  }
`;

const DragBox = styled.button<{ $openFoodInfo: boolean }>`
  position: relative;
  height: fit-content;
  transform: translate(0, 0);
  cursor: ${(props) => (props.$openFoodInfo ? 'not-allowed ' : 'pointer')};
  pointer-events: ${(props) => (props.$openFoodInfo ? 'none ' : 'all')};
`;

export default DraggableFood;
