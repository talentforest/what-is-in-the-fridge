import { AnimationControls } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { closeAddFoodArea } from 'src/lib/slice';

const CLOSE_X = -370;

export const useSlideAnimation = (slideXAnimation: AnimationControls) => {
  const { close } = useAppSelector((state) => state.addFoodArea);
  const dispatch = useAppDispatch();

  const onSlideClick = () => {
    close
      ? slideXAnimation.start({ x: 0 })
      : slideXAnimation.start({ x: CLOSE_X });
    dispatch(closeAddFoodArea());
  };

  return {
    onSlideClick,
    CLOSE_X,
  };
};
