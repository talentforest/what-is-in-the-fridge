import { useAppSelector } from 'src/lib/hooks';
import TabBtns, {
  Name,
  TabBtn,
} from 'src/components/my-fridge/addFoodSection/TabBtns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useAnimation } from 'framer-motion';
import { useSlideAnimation } from 'src/hooks';
import {
  faBars,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import Freezer from 'src/components/my-fridge/Freezer';
import Fridge from 'src/components/my-fridge/Fridge';
import Modal from 'src/components/common/Modal';
import tw from 'tailwind-styled-components';
import SearchResult from 'src/components/my-fridge/addFoodSection/SearchResult';
import AddFoodForm from 'src/components/my-fridge/addFoodSection/AddFoodForm';
import BookmarkList from 'src/components/my-fridge/addFoodSection/BookmarkList';
import ShoppingBagFood from 'src/components/my-fridge/ShoppingBagFood';

const MyFridge = () => {
  const { newFood } = useAppSelector((state) => state.newFood);
  const { storedFood } = useAppSelector((state) => state.storedFood);
  const { freezerOpen, fridgeOpen } = useAppSelector((state) => state.doorOpen);
  const { tabBtn } = useAppSelector((state) => state.tabBtn);
  const { close } = useAppSelector((state) => state.addFoodSection);
  const slideXAnimation = useAnimation();
  const { onSlideClick, CLOSE_X } = useSlideAnimation(slideXAnimation);
  const { newFoodModal, storedFoodModal } = useAppSelector(
    (state) => state.modal
  );

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
      <Main>
        {!fridgeOpen && <Freezer />}
        {!freezerOpen && <Fridge />}
        <ShoppingBagFood />
        {newFoodModal && <Modal food={newFood} />}
        <OpenTabBtn onClick={onSlideClick}>
          <CartIcon icon={faBars} color='#375fff' />
        </OpenTabBtn>
        <AddFoodSection
          transition={{ type: 'linear', duration: 0.6 }}
          initial={{ x: CLOSE_X }}
          animate={slideXAnimation}
        >
          <TabBtns onSlideClick={onSlideClick}>
            <TabBtn onClick={onSlideClick}>
              <FontAwesomeIcon
                icon={close ? faChevronRight : faChevronLeft}
                color='#666'
              />
              <Name>{close ? '열기' : '닫기'}</Name>
            </TabBtn>
          </TabBtns>
          {tabBtn === '식품 검색' && <SearchResult />}
          {tabBtn === '직접 식품 입력' && <AddFoodForm />}
          {tabBtn === '즐겨찾는 식품' && <BookmarkList />}
        </AddFoodSection>
        {storedFoodModal && <Modal food={storedFood} />}
      </Main>
    </>
  );
};

const Main = tw.main`
  relative
  overflow-hidden
  flex 
  flex-col
  justify-center
  items-center
  w-full
  h-screen
  m-auto
  desktop:pt-16
`;

const AddFoodSection = tw(motion.section)`
  z-10
  absolute
  top-0
  left-0
  bottom-0
  w-10/12
  flex
  flex-col
  max-w-[300px]
  rounded-r-xl
  bg-yellow-light
  tablet:w-96
  tablet:rounded-r-2xl
  tablet:max-w-[400px]
  py-4
`;

const OpenTabBtn = tw.button`
  fixed
  z-10
  top-3.5
  right-4
  w-6
  h-6
  cursor-pointer
  tablet:hidden
`;

const CartIcon = tw(FontAwesomeIcon)`
  h-5
  w-5
`;

export default MyFridge;
