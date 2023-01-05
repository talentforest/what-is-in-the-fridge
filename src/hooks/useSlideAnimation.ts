import { AnimationControls } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { closeAddFoodArea, openAddFoodArea } from 'src/lib/slice';

const FAR_CLOSE_X = -600;
const CLOSE_X = -275;

export const useSlideAnimation = (slideXAnimation: AnimationControls) => {
  const { open, close } = useAppSelector((state) => state.addFoodArea);
  const dispatch = useAppDispatch();

  const onFarSlideClick = () => {
    open
      ? slideXAnimation.start({ x: FAR_CLOSE_X })
      : slideXAnimation.start({ x: 0 });
    dispatch(openAddFoodArea());
  };
  const onSlideClick = () => {
    close
      ? slideXAnimation.start({ x: 0 })
      : slideXAnimation.start({ x: CLOSE_X });
    dispatch(closeAddFoodArea());
  };

  return {
    onFarSlideClick,
    onSlideClick,
    CLOSE_X,
    FAR_CLOSE_X,
  };
};
