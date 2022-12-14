import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function DesktopNav() {
  const { pathname } = useRouter();

  return (
    <Nav>
      <Link href='/'>
        <Logo>What is in my FRIDGE</Logo>
      </Link>
      <Menu>
        <List href='/my-fridge' $active={pathname === '/my-fridge'}>
          나의 냉장고
        </List>
        <List href='/my-setting' $active={pathname === '/my-setting'}>
          나의 설정
        </List>
      </Menu>
    </Nav>
  );
}

const Nav = tw.nav`
  flex
  justify-between
  items-center
  h-12
  bg-yellow
  tablet:text-base
  mobile:text-[12px]
  tablet:px-10
  mobile:px-3
`;
const Logo = tw.h1`
  text-orange
  font-bold
`;
const Menu = tw.ul`
  flex
  justify-between
  items-center
  gap-5
  text-gray-dark
`;
const List = tw(Link)<{ $active: boolean }>`
  ${(p: { $active: boolean }) => (p.$active ? 'text-gray-dark' : 'text-gray')}
  ${(p: { $active: boolean }) => (p.$active ? 'font-bold' : 'font-normal')}
`;
