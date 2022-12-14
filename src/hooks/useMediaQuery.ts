import { useEffect, useState } from 'react';
import { screens } from 'src/utils/screen';

const useMediaQuery = () => {
  const [showMobileNav, setShowMobileNav] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= screens.tablet) {
        setShowMobileNav(false);
      } else {
        setShowMobileNav(true);
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    showMobileNav,
  };
};

export default useMediaQuery;
