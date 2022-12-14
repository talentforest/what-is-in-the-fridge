import useMediaQuery from 'src/hooks/useMediaQuery';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Layout({ children }: any) {
  const { showMobileNav } = useMediaQuery();

  return (
    <>
      {showMobileNav ? <MobileNav /> : <DesktopNav />}
      {children}
    </>
  );
}
