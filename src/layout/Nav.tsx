import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function Layout() {
  const { pathname } = useRouter();

  return (
    <Nav>
      <Logo>What is in my FRIDGE</Logo>
      <Menu>
        <List href='/' $active={pathname === '/'}>
          나의 냉장고
        </List>
        <List href='/my-fridge' $active={pathname === '/my-fridge'}>
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
  px-10
  h-12
  bg-yellow
`;
const Logo = tw.h1`
  text-orange
  font-bold
  text-sm
`;
const Menu = tw.ul`
  flex
  justify-between
  items-center
  gap-5
  text-sm
  text-gray-dark
`;
const List = tw(Link)<{ $active: boolean }>`
  ${(p: { $active: boolean }) => (p.$active ? 'text-orange' : 'text-gray')}
  ${(p: { $active: boolean }) => (p.$active ? 'font-bold' : 'font-normal')}
`;
