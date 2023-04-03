import tw from 'tailwind-styled-components';
import Link from 'next/link';
import Image from 'next/image';

export default function Navigation() {
  return (
    <Nav>
      <LogoBox href='/'>
        <Image
          src={`/assets/로고.png`}
          alt='로고'
          width={100}
          height={20}
          className='w-full h-auto'
          priority
        />
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
  bg-green
  tablet:bg-blue-light
  tablet:text-base
  tablet:px-12
  tablet:h-14
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
  tablet:text-lg
`;
