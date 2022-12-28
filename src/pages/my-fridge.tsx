import Head from 'next/head';
import FridgeFreezerSection from 'src/components/template/FridgeFreezerSection';
import AddFoodSection from 'src/components/template/AddFoodSection';

const MyFridge = () => {
  return (
    <>
      <Head>
        <title>나의 냉장고</title>
        <meta name='title' property='og:title' content='냉장고에 뭐가 있지?' />
        <meta
          name='description'
          content='관리는 한눈에 파악하는 것에서부터 시작해요. 냉장고 안 식재료를 한눈에 보고 상태를 파악하고 싶으세요? 냉장고 안 식재료 관리에 도음을 드립니다.'
        />
        <meta name='image' property='og:image' content='/bookmarklist.png' />
        <meta
          name='keywords'
          content='나의 냉장고, 냉장고, 냉장고 지도, 냉장고 관리, 식재료, 식재료 관리, 식료품, 유통기한, 냉파, 냉장고 파먹기, 냉장고 재료, 즐겨찾는 식품, 즐겨찾기'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <FridgeFreezerSection />
      <AddFoodSection />
    </>
  );
};

export default MyFridge;
