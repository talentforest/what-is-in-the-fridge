import { useWindowSize } from 'src/hooks';
import { useRouter } from 'next/router';
import { screens } from 'src/utils/screens';
import tw from 'tailwind-styled-components';
import Link from 'next/link';
import Image from 'next/image';

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
            <Image
              src='/assets/fridge.svg'
              alt='fridge icon'
              height={20}
              width={20}
              color='red'
            />
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
