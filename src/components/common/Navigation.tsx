import tw from 'tailwind-styled-components';
import Link from 'next/link';

export default function Navigation() {
  return (
    <Nav>
      <LogoBox href='/'>
        <Logo>What&#39;s in my FRIDGE?</Logo>
      </LogoBox>
    </Nav>
  );
}

const Nav = tw.nav`
  z-10
  fixed
  w-full
  h-12
  px-5
  flex
  justify-between
  items-center
  text-md
  bg-blue-light
  tablet:text-base
  tablet:px-12
  desktop:h-12
`;

const LogoBox = tw(Link)` 
  flex
  gap-1
  items-center
  h-full
  cursor-pointer
`;

const Logo = tw.h1`
  text-orange
  text-md
`;
