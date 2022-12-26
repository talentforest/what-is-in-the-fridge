import { AnimationControls } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { closeAddFoodArea, openAddFoodArea } from 'src/lib/slice';

const MOBILE_CLOSE_X = -400;
const CLOSE_X = -275;

export const useSlideAnimation = (slideXAnimation: AnimationControls) => {
  const { open, close } = useAppSelector((state) => state.addFoodArea);
  const dispatch = useAppDispatch();

  const onMobileClick = () => {
    open
      ? slideXAnimation.start({ x: MOBILE_CLOSE_X })
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
    MOBILE_CLOSE_X,
  };
};
