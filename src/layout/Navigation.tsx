import tw from 'tailwind-styled-components';
import Link from 'next/link';
import useWindowSize from 'src/hooks/useWindowSize';
import { useRouter } from 'next/router';
import { screens } from 'src/utils/screen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';

export default function Navigation() {
  const { pathname } = useRouter();
  const { windowSize } = useWindowSize();

  return (
    <Nav>
      <Link href='/'>
        <Logo>What&#39;s in my FRIDGE?</Logo>
      </Link>
      <Menu>
        {windowSize.width >= screens.tablet ? (
          <List href='/my-fridge' $active={pathname === '/my-fridge'}>
            나의 냉장고
          </List>
        ) : (
          <List href='/my-fridge' $active={pathname === '/my-fridge'}>
            <FontAwesomeIcon icon={faBagShopping} size='xl' color='#ff7b00' />
          </List>
        )}
      </Menu>
    </Nav>
  );
}

const Nav = tw.nav`
  flex
  justify-between
  items-center
  desktop:h-12
  h-12
  tablet:text-base
  mobile:text-[12px]
  tablet:px-16
  mobile:px-5
`;
const Logo = tw.h1`
  text-orange
  font-bold
  text-[13px]
`;
const Menu = tw.ul`
  flex
  justify-between
  items-center
  gap-5
  text-gray-dark
`;
const List = tw(Link)<{ $active: boolean }>`
  text-[13px]
  ${(p: { $active: boolean }) => (p.$active ? 'text-gray-dark' : 'text-gray')}
  ${(p: { $active: boolean }) => (p.$active ? 'font-bold' : 'font-normal')}
`;
