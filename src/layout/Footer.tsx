import Link from 'next/link';
import tw from 'tailwind-styled-components';

const Footer = () => {
  return (
    <FooterBox>
      <Title>프로젝트: 냉장고에 뭐가 있지?</Title>
      <ListBox>
        <List>
          <Label>Email</Label>
          <span>talentforest0501@gmail.com</span>
        </List>
        <List>
          <Label>GitHub</Label>
          <Link href='https://github.com/talentforest'>
            https://github.com/talentforest
          </Link>
        </List>
      </ListBox>
    </FooterBox>
  );
};

const FooterBox = tw.footer`
  w-full
  p-10
  pb-12
  bg-gray-dark
  text-white
`;
const Title = tw.h1`
  text-[14px]
  mb-3
`;
const ListBox = tw.ul`
  flex
  flex-col
  text-[12px]
  gap-y-1
  gap-x-10
  tablet:w-fit
`;
const List = tw.li`
  flex
  gap-1.5
`;
const Label = tw.span` 
  text-gray-light
  w-10
  inline-block
`;
const LinkBtn = tw(Link)<{ $color: boolean }>` 
  w-fit
  ${(p: { $color: boolean }) => (p.$color ? 'bg-blue-dark' : 'bg-red-light')}
  flex
  items-center
  h-8
  px-3
  rounded-3xl
  shadow-2xl
  shadow-white
  mt-3
  text-[13px]
`;

export default Footer;
