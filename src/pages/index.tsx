import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { featureDecsArr, recommendDescArr } from 'src/utils/descriptions';
import Head from 'next/head';
import Link from 'next/link';
import RecommendDescItem from 'src/components/index/RecommendDescItem';
import TiltBox from 'src/components/index/TiltBox';
import FeatureDescItem from 'src/components/index/FeatureDescItem';
import tw from 'tailwind-styled-components';

export default function Home() {
  return (
    <>
      <Head>
        <title>냉장고에 뭐가 있지?</title>
        <meta name='title' property='og:title' content='냉장고에 뭐가 있지?' />
        <meta
          name='description'
          content='관리는 한눈에 파악하는 것에서부터 시작해요. 냉장고 안 식재료를 한눈에 보고 상태를 파악하고 싶으세요? 냉장고 안 식재료 관리에 도음을 드립니다.'
        />
        <meta name='image' property='og:image' content='/bookmarklist.png' />
        <meta
          name='keywords'
          content='냉장고, 냉장고 지도, 냉장고 관리, 식재료, 식재료 관리, 식료품, 유통기한, 냉파, 냉장고 파먹기, 냉장고 재료, 즐겨찾는 식품, 즐겨찾기'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FirstScreen>
        <MainImg />
        <Contents>
          <Title>냉장고에 뭐가 있지?</Title>
          <Button href='/my-fridge'>
            <span>냉장고 관리 체험해보기</span>
            <FontAwesomeIcon icon={faChevronRight} size='sm' />
          </Button>
        </Contents>
      </FirstScreen>
      <Section $color $tilt>
        <SubTitle>
          <strong>냉장고에 뭐가 있지?</strong>는
          <br />
          이럴 때 쓰시면 좋아요.
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
        <TiltBox top />
        <TiltBox />
      </Section>
      <Section>
        <SubTitle>
          <strong>냉장고에 뭐가 있지?</strong>는
          <br />
          다양한 냉장고 관리 기능이 있어요.
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
      <Section $color $tilt>
        <TiltBox top />
        <Contents>
          <SubTitle>한번 체험해보시겠어요?</SubTitle>
          <Title>냉장고에 뭐가 있지?</Title>
          <Button href='/my-fridge'>
            <span>냉장고 관리 체험해보기</span>
            <FontAwesomeIcon icon={faChevronRight} size='sm' />
          </Button>
        </Contents>
      </Section>
    </>
  );
}

const FirstScreen = tw.section`
  gap-3
  flex
  justify-between
  items-center
  tablet:h-[calc(100vh-theme(spacing.24))]
  tablet:max-h-[700px]
  tablet:flex-row
  desktop:p-52
  tablet:p-20
  mobile:h-[calc(90vh-theme(spacing.10))]
  mobile:flex-col
  mobile:py-20
`;
const MainImg = tw.div` 
 rounded-full
 tablet:w-60
 tablet:h-60
 mobile:w-40
 mobile:h-40
 bg-green
`;
const Contents = tw.div` 
  flex
  flex-col
  mobile:items-center
  tablet:items-start
  w-fit
  mobile:p-0
`;
const Title = tw.h1`
  mobile:text-[24px]
  tablet:text-[32px]
  desktop:text-[40px]
  font-bold
  mobile:mb-5
`;
const Button = tw(Link)`
  w-fit
  px-4
  tablet:h-14
  mobile:h-12
  tablet:text-lg
  mobile:text-md
  rounded-xl
  flex
  gap-2
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
  ${(p: { $tilt: boolean }) => (p.$tilt ? 'py-40' : 'pt-20')}
`;
const SubTitle = tw.h2`
  mb-10
  tablet:text-[30px]
  mobile:text-[18px]
  text-center
`;
const List = tw.ul`
  tablet:grid
  tablet:grid-cols-2
  desktop:grid-cols-4
  tablet:gap-8
  
  tablet:p-10
`;
