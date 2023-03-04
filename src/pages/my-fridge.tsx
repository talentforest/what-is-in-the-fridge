import { useAppSelector } from 'src/lib/hooks';
import TabBtns, { Name, TabBtn } from 'src/components/addFood/TabBtns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion, useAnimation } from 'framer-motion';
import { useSlideAnimation } from 'src/hooks';
import {
  faCartPlus,
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import Head from 'next/head';
import Freezer from 'src/components/fridgeFreezer/Freezer';
import Fridge from 'src/components/fridgeFreezer/Fridge';
import Modal from 'src/components/fridgeFreezer/Modal';
import tw from 'tailwind-styled-components';
import SearchResult from 'src/components/addFood/SearchResult';
import AddFoodForm from 'src/components/addFood/AddFoodForm';
import BookmarkList from 'src/components/addFood/BookmarkList';
import AddModal from 'src/components/addFood/AddModal';

const MyFridge = () => {
  const { modal } = useAppSelector((state) => state.addedFoodModal);
  const { freezerOpen, fridgeOpen } = useAppSelector((state) => state.doorOpen);
  const { tab } = useAppSelector((state) => state.tab);
  const { modal: addFoodModal } = useAppSelector((state) => state.foodModal);
  const { close } = useAppSelector((state) => state.addFoodArea);
  const slideXAnimation = useAnimation();
  const { onSlideClick, CLOSE_X } = useSlideAnimation(slideXAnimation);

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
        <FridgeBox>
          {!fridgeOpen && <Freezer />}
          {!freezerOpen && <Fridge />}
        </FridgeBox>
        {modal && <Modal />}
      </Main>
      <AddBtn onClick={onSlideClick}>
        <CartIcon icon={faCartPlus} color='#66a8ea' />
      </AddBtn>
      {addFoodModal && <AddModal />}
      <AddFoodTab
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
        {tab === '식품 검색' && <SearchResult />}
        {tab === '직접 식품 입력' && <AddFoodForm />}
        {tab === '즐겨찾는 식품' && <BookmarkList />}
      </AddFoodTab>
    </>
  );
};

const Main = tw.main`
  relative
  h-screen
`;

const FridgeBox = tw.div`
  flex 
  flex-col
  justify-center
  items-center
  h-full
  w-full
  pb-10
  m-auto
  tablet:pb-0
`;

const AddFoodTab = tw(motion.section)`
  z-5
  absolute
  top-0
  bottom-0
  w-10/12
  p-4
  flex
  flex-col
  max-w-[300px]
  rounded-r-xl
  bg-yellow-light
  tablet:w-96
  tablet:rounded-r-2xl
  tablet:max-w-[400px]
  tablet:p-6
`;

const AddBtn = tw.button`
  absolute
  bottom-4
  right-4
  w-24
  h-24
  flex
  justify-center
  items-center
  shadow-xl
  rounded-full
  cursor-pointer
  bg-yellow
  tablet:hidden
`;

const CartIcon = tw(FontAwesomeIcon)`
  h-10
  tablet:h-16
`;

export default MyFridge;
