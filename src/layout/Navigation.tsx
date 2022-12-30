import { useWindowSize } from 'src/hooks/index';
import { useRouter } from 'next/router';
import { screens } from 'src/utils/screens';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBagShopping } from '@fortawesome/free-solid-svg-icons';
import tw from 'tailwind-styled-components';
import Link from 'next/link';

export default function Navigation() {
  const { pathname } = useRouter();
  const { windowSize } = useWindowSize();

  return (
    <Nav>
      <LogoBox href='/'>
        <Logo>What&#39;s in my FRIDGE?</Logo>
      </LogoBox>
      <MenuBox>
        {windowSize.width >= screens.tablet ? (
          <List href='/my-fridge' $active={pathname === '/my-fridge'}>
            나의 냉장고
          </List>
        ) : (
          <List href='/my-fridge' $active={pathname === '/my-fridge'}>
            <FontAwesomeIcon icon={faBagShopping} size='xl' color='#ff7b00' />
          </List>
        )}
      </MenuBox>
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
  tablet:px-12
  mobile:px-5
  text-md
`;
const LogoBox = tw(Link)` 
  flex
  gap-1
  items-center
`;
const Logo = tw.h1`
  text-orange
  text-md
`;
const MenuBox = tw.ul`
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
