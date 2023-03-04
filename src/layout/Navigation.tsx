import tw from 'tailwind-styled-components';
import Link from 'next/link';

export default function Navigation() {
  return (
    <Nav>
      <LogoBox href='/'>
        <Logo>What&#39;s in my FRIDGE?</Logo>
      </LogoBox>
      <MenuBox></MenuBox>
    </Nav>
  );
}

const Nav = tw.nav`
  z-40
  fixed
  w-full
  h-12
  px-5
  flex
  justify-between
  items-center
  text-md
  tablet:text-base
  tablet:px-12
  desktop:h-12
  bg-blue-light
`;

const LogoBox = tw(Link)` 
  flex
  gap-1
  items-center
  cursor-pointer
  h-full
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
