import tw from 'tailwind-styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

export default function MobileNav() {
  const { pathname } = useRouter();

  return (
    <Nav>
      <Menu>
        <FontAwesomeIcon icon={faCirclePlus} size='lg' />
      </Menu>
      <Link href='/'>
        <Logo>What is in my FRIDGE</Logo>
      </Link>
    </Nav>
  );
}

const Nav = tw.nav`
  flex
  justify-between
  items-center
  h-12
  bg-yellow
  text-[12px]
  px-5
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
