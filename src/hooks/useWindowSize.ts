import { useEffect, useState } from 'react';

interface IWindowSize {
  width: number;
}

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<IWindowSize>({
    width: 0,
  });

  const throttle = (func: () => void, delay: number) => {
    let inProgress = false;
    return () => {
      if (inProgress) return;
      inProgress = true;
      setTimeout(() => {
        func();
        inProgress = false;
      }, delay);
    };
  };

  useEffect(() => {
    const handleResize = throttle(() => {
      setWindowSize({
        width: window.innerWidth,
      });
    }, 500);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return { windowSize };
};
