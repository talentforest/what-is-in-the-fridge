import { useEffect, useCallback, RefObject } from 'react';

interface IScrollFadeIn {
  targetDom: RefObject<HTMLElement>;
}

export const useScrollFadeIn = ({ targetDom }: IScrollFadeIn) => {
  const handleDirection = (name: string) => {
    switch (name) {
      case 'up':
        return 'translate3d(0, 20%, 0)';
      case 'down':
        return 'translate3d(0, -30%, 0)';
      case 'left':
        return 'translate3d(50%, 0, 0)';
      case 'right':
        return 'translate3d(-50%, 0, 0)';
      default:
        return;
    }
  };

  const handleScroll = useCallback(
    ([entry]: IntersectionObserverEntry[]) => {
      const { current } = targetDom;
      if (entry.isIntersecting && current) {
        current.style.transitionProperty = 'all';
        current.style.transitionDuration = '0.7s';
        current.style.transitionTimingFunction = 'cubic-bezier(0, 0, 0.2, 1)';
        current.style.transitionDelay = '0s';
        current.style.opacity = '1';
        current.style.transform = 'translate3d(0, 0, 0)';
      }
    },
    [targetDom]
  );

  useEffect(() => {
    let observer: IntersectionObserver;
    const { current } = targetDom;
    if (current) {
      observer = new IntersectionObserver(handleScroll, { threshold: 0.7 });
      observer.observe(current);
    }

    return () => observer && observer.disconnect();
  }, [handleScroll, targetDom]);

  return {
    style: {
      opacity: '0',
      transform: handleDirection('up'),
    },
  };
};
