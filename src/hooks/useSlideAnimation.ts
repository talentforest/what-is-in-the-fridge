import { AnimationControls } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { closeAddFoodArea, openAddFoodArea } from 'src/lib/slice';

const CLOSE_X = -290;

export const useSlideAnimation = (slideXAnimation: AnimationControls) => {
  const { open, close } = useAppSelector((state) => state.addFoodArea);
  const dispatch = useAppDispatch();

  const onMobileClick = () => {
    open
      ? slideXAnimation.start({ x: CLOSE_X })
      : slideXAnimation.start({ x: 0 });
    dispatch(openAddFoodArea());
  };
  const onDesktopClick = () => {
    close
      ? slideXAnimation.start({ x: 0 })
      : slideXAnimation.start({ x: CLOSE_X });
    dispatch(closeAddFoodArea());
  };

  return {
    onMobileClick,
    onDesktopClick,
    CLOSE_X,
  };
};
