import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { featureDecsArr, recommendDescArr } from 'src/utils/descriptions';
import { useScrollFadeIn } from 'src/hooks';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import Head from 'next/head';
import Link from 'next/link';
import RecommendDescItem from 'src/components/index/RecommendDescItem';
import FeatureDescItem from 'src/components/index/FeatureDescItem';
import tw from 'tailwind-styled-components';
import Image from 'next/image';

const pathVariants = {
  start: {
    pathLength: 0,
  },
  end: {
    pathLength: 1,
  },
};

export default function Home() {
  const targetDom = useRef<HTMLElement>(null);
  const { style } = useScrollFadeIn({ targetDom });

  return (
    <>
      <Head>
        <title>냉장고에 뭐가 있지??</title>
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
      {/* First Page */}
      <Section>
        <Contents>
          <Title>냉장고에 뭐가 있지?</Title>
          <Btn href='/my-fridge'>
            <span>냉장고 관리 체험해보기</span>
            <FontAwesomeIcon icon={faChevronRight} size='sm' />
          </Btn>
        </Contents>
        <ImgBox>
          <Image
            src='/assets/냉장고.png'
            alt='냉장고'
            width={280}
            height={280}
            priority
          />
          <Search
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth='4'
            stroke='white'
            className='w-16 h-16'
          >
            <motion.path
              variants={pathVariants}
              initial='start'
              animate='end'
              strokeWidth={4}
              transition={{
                default: { duration: 1 },
              }}
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
            />
          </Search>
        </ImgBox>
      </Section>
      {/* Second Page */}
      <Section $color>
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
      <Section $color>
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
      </Section>
      <Section>
        <SubTitle>한번 체험해보시겠어요?</SubTitle>
        <Title>냉장고에 뭐가 있지?</Title>
        <Btn href='/my-fridge'>
          <span>냉장고 관리 체험해보기</span>
          <FontAwesomeIcon icon={faChevronRight} size='sm' />
        </Btn>
      </Section>
    </>
  );
}

const Section = tw.section<{ $color: boolean }>`
  border-bottom
  py-10
  flex
  flex-col
  justify-center
  items-center
  min-h-screen
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

const Btn = tw(Link)`
  border-2
  border-gray-light
  cursor-pointer
  flex
  items-center
  justify-center
  gap-2
  p-4
  font-bold
  text-base
  rounded-full
  shadow-lg
  bg-yellow
  text-blue-dark
  hover:text-yellow
  hover:bg-blue-dark
  hover:scale-105
  transition
  duration-300
  ease-in-out
  appearance-none
`;

const ImgBox = tw.div`
  relative
  mt-10
`;

const Search = tw.svg`
  absolute
  top-20
  bottom-0
  left-0
  right-12
  m-auto
  stroke-yellow
  font-bold
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
