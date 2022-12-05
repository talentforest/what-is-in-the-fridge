import tw from 'tailwind-styled-components';
export default function Layout() {
  return (
    <Nav>
      <Logo>What is in my FRIDGE</Logo>
      <Menu>
        <li>나의 냉장고</li>
        <li>나의 설정</li>
      </Menu>
    </Nav>
  );
}

const Nav = tw.nav`
  flex
  justify-between
  align-middle
  p-5
`;

const Logo = tw.h1`
  text-orange
  font-bold
  text-sm
`;

const Menu = tw.ul`
  text-base
  flex
  justify-between
  align-middle
  gap-5
  text-gray-dark
`;
