import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fadeInItems, slides } from 'src/utils/descriptions';
import Head from 'next/head';
import Link from 'next/link';
import tw from 'tailwind-styled-components';
import Image from 'next/image';
import FadeInItem from 'src/components/index/FadeInItem';

export default function Home() {
  return (
    <>
      <Head>
        <title>냉장고에 뭐가 있지??</title>
        <meta name='title' property='og:title' content='냉장고에 뭐가 있지?' />
        <meta
          name='description'
          content='관리는 한눈에 파악하는 것에서부터 시작해요. 냉장고 안 식재료를 한눈에 보고 상태를 파악하고 싶으세요? 냉장고 안 식재료 관리에 도음을 드립니다.'
        />
        <meta name='image' property='og:image' content='/assets/냉장고.png' />
        <meta
          name='keywords'
          content='냉장고, 냉장고 지도, 냉장고 관리, 식재료, 식재료 관리, 식료품, 유통기한, 냉파, 냉장고 파먹기, 냉장고 재료, 즐겨찾는 식품, 즐겨찾기'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FirstScreen>
        <Contents>
          <TitleDesc>냉장고를 한눈에 관리하는</TitleDesc>
          <Title>냉장고에 뭐가 있지?</Title>
          <Btn href='/my-fridge'>
            <span>냉장고 관리 체험해보기</span>
            <FontAwesomeIcon icon={faChevronRight} size='sm' />
          </Btn>
        </Contents>
        <ImgBox>
          <Image
            src='/assets/냉장고 정리.png'
            alt='냉장고'
            fill
            sizes='(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw'
            priority
            className='animate-[wiggle_1s_ease-in-out_2]'
          />
        </ImgBox>
      </FirstScreen>
      <Section>
        <SubTitle>
          이럴 때 <strong>냉장고에 뭐가 있지?</strong>를 써보세요
        </SubTitle>
        <List>
          {fadeInItems.map((item) => (
            <FadeInItem key={item.id} item={item} smImg />
          ))}
        </List>
      </Section>
      <Section>
        <SubTitle>
          <strong>냉장고에 뭐가 있지?</strong>로 냉장고를 이렇게 관리하실 수
          있어요
        </SubTitle>
        <FeatList>
          {slides.map((item) => (
            <FadeInItem key={item.id} item={item} />
          ))}
        </FeatList>
        <BigBtn href='/my-fridge'>
          <span>냉장고 관리 체험해보기</span>
          <FontAwesomeIcon icon={faChevronRight} size='sm' />
        </BigBtn>
      </Section>
    </>
  );
}

const FirstScreen = tw.section`
  relative
  flex
  flex-col
  justify-between
  items-center
  py-28
  tablet:pt-28
  tablet:pb-44
  desktop:h-screen
  desktop:flex-row
  desktop:pt-48
  desktop:px-20
`;

const ImgBox = tw.div`
  relative
  aspect-square
  w-3/4
  h-auto
  tablet:w-2/5
  desktop:w-1/2
`;

const Contents = tw.div` 
  w-fit
  h-fit
  flex
  flex-col
  items-center
  desktop:items-start
  desktop:pb-10
`;

const TitleDesc = tw.p`
  mb-2
  text-gray-dark
  text-[19px]
  tablet:text-[23px]
  desktop:text-[30px]
  desktop:mb-0
`;

const Title = tw.h1`
  font-bold
  text-[24px]
  tablet:text-[30px]
  desktop:text-[40px]
`;

const Btn = tw(Link)`
  absolute
  bottom-12
  cursor-pointer
  flex
  items-center
  justify-center
  gap-2
  p-3
  text-md
  font-bold
  rounded-full
  shadow-lg
  border-2
  border-gray-light
  bg-yellow
  text-blue-dark
  hover:text-yellow
  hover:bg-blue-dark
  hover:scale-105
  transition
  duration-300
  ease-in-out
  appearance-none
  tablet:bottom-20
  tablet:p-4
  tablet:text-base
  desktop:static
  desktop:mt-5
`;

const BigBtn = tw(Btn)`
  p-6
  tablet:h-20
  tablet:w-60
  text-lg
  mt-20
  mb-28
  tablet:m-28
  static
 
`;

const Section = tw.section`
  relative
  pt-12
  px-5
  flex
  flex-col
  justify-center
  items-center
  pb-28
`;

const SubTitle = tw.h4`
  mb-10
  text-[20px]
  text-center
  break-keep
  tablet:text-[26px]
  desktop:w-full
`;

const List = tw.ul`
  w-[90%]
  flex
  flex-col
  space-y-10
  tablet:space-y-0
  tablet:w-[70%]
  tablet:grid
  tablet:grid-cols-2
  tablet:gap-6
  desktop:gap-12
  
`;

const FeatList = tw(List)`
  tablet:w-[85%]
  desktop:grid
  desktop:grid-cols-2
  desktop:gap-12
  desktop:w-3/4
  desktop:mb-20
`;
