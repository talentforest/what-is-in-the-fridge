import useWindowSize from 'src/hooks/useWindowSize';
import { screens } from 'src/utils/screen';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

export default function Layout({ children }: any) {
  const { windowSize } = useWindowSize();

  return windowSize.width !== 0 ? (
    <>
      {screens.tablet >= windowSize.width ? <MobileNav /> : <DesktopNav />}
      {children}
    </>
  ) : (
    <div>Loading...</div>
  );
}
