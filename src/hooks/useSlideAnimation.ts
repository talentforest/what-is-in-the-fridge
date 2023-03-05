import { AnimationControls } from 'framer-motion';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { toggleSlide } from 'src/lib/slice';

const CLOSE_X = -370;

export const useSlideAnimation = (slideXAnimation: AnimationControls) => {
  const { close } = useAppSelector((state) => state.addFoodSection);
  const dispatch = useAppDispatch();

  const onSlideClick = () => {
    close
      ? slideXAnimation.start({ x: 0 })
      : slideXAnimation.start({ x: CLOSE_X });
    dispatch(toggleSlide());
  };

  return {
    onSlideClick,
    CLOSE_X,
  };
};
