import Link from 'next/link';
import tw from 'tailwind-styled-components';

const Footer = () => {
  return (
    <FooterBox>
      <Title>프로젝트: 냉장고에 뭐 있지?</Title>
      <ListBox>
        <List>
          <Label>이메일</Label>
          <span>talentforest0501@gmail.com</span>
        </List>
        <List>
          <Label>깃헙</Label>
          <Link href='https://github.com/talentforest'>
            https://github.com/talentforest
          </Link>
        </List>
        <List>
          <LinkBtn href='https://www.notion.so/jellieplanet/5e4525d3574345058a94f01232ac6456'>
            이력서
          </LinkBtn>
          <LinkBtn
            $color
            href='https://jellieplanet.notion.site/SIDE-PROJECTS-eed56193b0834588b17e81c30dbf1525'
          >
            다른 볼만한 프로젝트
          </LinkBtn>
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
  text-[12px]
  gap-y-1
  gap-x-10
  tablet:w-fit
  tablet:grid
  tablet:grid-cols-2
  tablet:grid-rows-2
  mobile:flex 
  mobile:flex-col
  
`;
const List = tw.li`
  flex
  gap-1.5
  items-end
  tablet:even:col-start-1
  talbet:last:col-start-2
  talbet:last:row-span-full
`;
const Label = tw.span` 
  text-gray-light
  w-10
  inline-block
`;
const LinkBtn = tw(Link)<{ $color: boolean }>` 
  ${(p: { $color: boolean }) => (p.$color ? 'bg-blue-dark' : 'bg-red-light')}
  flex
  items-center
  h-8
  px-3
  rounded-3xl
  shadow-2xl
  shadow-white
  tablet:mt-0
  mobile:mt-3
`;

export default Footer;
