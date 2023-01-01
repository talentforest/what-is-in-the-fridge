import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { featureDecsArr, recommendDescArr } from 'src/utils/descriptions';
import { useScrollFadeIn } from 'src/hooks';
import { useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import RecommendDescItem from 'src/components/index/RecommendDescItem';
import TiltBox from 'src/components/index/TiltBox';
import FeatureDescItem from 'src/components/index/FeatureDescItem';
import tw from 'tailwind-styled-components';
import Image from 'next/image';

export default function Home() {
  const targetDom = useRef<HTMLElement>(null);
  const { style } = useScrollFadeIn({ targetDom });

  return (
    <>
      <Head>
        <title>냉장고에 뭐가 있지?</title>
        <meta name='title' property='og:title' content='냉장고에 뭐가 있지?' />
        <meta
          name='description'
          content='관리는 한눈에 파악하는 것에서부터 시작해요. 냉장고 안 식재료를 한눈에 보고 상태를 파악하고 싶으세요? 냉장고 안 식재료 관리에 도음을 드립니다.'
        />
        <meta
          name='image'
          property='og:image'
          content='/assets/bookmarklist.png'
        />
        <meta
          name='keywords'
          content='냉장고, 냉장고 지도, 냉장고 관리, 식재료, 식재료 관리, 식료품, 유통기한, 냉파, 냉장고 파먹기, 냉장고 재료, 즐겨찾는 식품, 즐겨찾기'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FirstScreen>
        <Contents>
          <Title>냉장고에 뭐가 있지?</Title>
          <Button href='/my-fridge'>
            <span>냉장고 관리 체험해보기</span>
            <FontAwesomeIcon icon={faChevronRight} size='sm' />
          </Button>
        </Contents>
        <Img
          src='/assets/메인.png'
          alt='즐겨찾기 식품 리스트'
          width={600}
          height={600}
          sizes='(max-width: 768px) 600px,
          (max-width: 1200px) 300px,
          30px'
          priority
        />
      </FirstScreen>
      <Section $color $tilt>
        <TiltBox top />
        <SubTitle ref={targetDom} style={{ ...style }}>
          <strong>냉장고에 뭐가 있지?</strong>는 이럴 때 쓰시면 좋아요.
        </SubTitle>
        <List>
          {recommendDescArr.map((item) => (
            <RecommendDescItem
              key={item.contents}
              imgUrl={item.imgUrl}
              contents={item.contents}
            />
          ))}
        </List>
      </Section>
      <Section $color $tilt>
        <SubTitle>
          <strong>냉장고에 뭐가 있지?</strong>는 다양한 냉장고 관리 기능이
          있어요.
        </SubTitle>
        <List>
          {featureDecsArr.map((item) => (
            <FeatureDescItem
              key={item.contents}
              imgUrl={item.imgUrl}
              contents={item.contents}
            />
          ))}
        </List>
        <TiltBox />
      </Section>
      <Section $tilt>
        <SubTitle>한번 체험해보시겠어요?</SubTitle>
        <Title>냉장고에 뭐가 있지?</Title>
        <Button href='/my-fridge'>
          <span>냉장고 관리 체험해보기</span>
          <FontAwesomeIcon icon={faChevronRight} size='sm' />
        </Button>
      </Section>
    </>
  );
}

const FirstScreen = tw.section`
  flex
  items-center
  desktop:gap-2
  tablet:gap-4
  mobile:gap-8
  tablet:h-[calc(100vh-theme(spacing.24))]
  tablet:max-h-[700px]
  tablet:flex-row
  desktop:w-[800px]
  tablet:w-[700px]
  m-auto
  mobile:p-10
  mobile:h-[calc(90vh-theme(spacing.10))]
  mobile:flex-col
  tablet:justify-between
  mobile:justify-center
`;
const Img = tw(Image)` 
  mobile:h-auto
  mobile:w-80
  tablet:w-[250px]
  relative
`;
const Contents = tw.div` 
  flex
  flex-col
  mobile:items-center
  tablet:items-start
  w-fit
`;
const Title = tw.h1`
  mobile:text-[24px]
  tablet:text-[28px]
  desktop:text-[40px]
  font-bold
  mobile:mb-5
`;
const Button = tw(Link)`
  cursor-pointer
  tablet:w-52
  mobile:w-48
  px-3
  desktop:h-16
  tablet:h-14
  mobile:h-12
  tablet:text-base
  mobile:text-md
  rounded-xl
  flex
  gap-1
  items-center
  justify-center
  bg-yellow
  text-blue-dark
  shadow-md
  hover:text-yellow
  hover:bg-blue-dark
  hover:scale-105
  transition
  duration-300
  ease-in-out
  appearance-none
`;

const Section = tw.section<{ $color: boolean; $tilt: boolean }>`
  py-10
  flex
  flex-col
  justify-center
  items-center
  relative  
  bg-green
  first:bg-transparent
  ${(p: { $color: boolean }) => (p.$color ? 'bg-green' : 'bg-transparent')}
  ${(p: { $tilt: boolean }) => (p.$tilt ? 'mobile:py-20' : 'mobile:pt-20')}
  ${(p: { $tilt: boolean }) => (p.$tilt ? 'tablet:py-40' : 'tablet:pt-20')}
`;
const SubTitle = tw.h2`
  mb-10
  tablet:text-[30px]
  mobile:text-[18px]
  text-center
  desktop:w-full
  p-10
  break-keep
`;
const List = tw.ul`
  tablet:grid
  tablet:grid-cols-2
  desktop:grid-cols-4
  tablet:gap-16
  tablet:gap-x-20
  tablet:p-10
`;
