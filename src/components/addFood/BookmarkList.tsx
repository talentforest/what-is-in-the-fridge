import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Emoji } from 'emoji-picker-react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { cutLetter } from 'src/utils/cutLetter';
import {
  faCartPlus,
  faChevronLeft,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { changeFoodInfo } from 'src/lib/slice';
import { initialState } from 'src/hooks/useAddFood';
import { useHandleBookmark } from 'src/hooks';
import { BackBtn, Title } from './SearchResult';
import Image from 'next/image';
import AddFoodForm from './AddFoodForm';
import tw from 'tailwind-styled-components';

const BookmarkList = () => {
  const { tab } = useAppSelector((state) => state.tab);
  const { food } = useAppSelector((state) => state.food);
  const { bookmark } = useAppSelector((state) => state.bookmark);
  const { onRemoveClick, onAddFoodClick } = useHandleBookmark();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tab === '즐겨찾는 식품') {
      dispatch(changeFoodInfo(initialState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackClick = () => {
    const result = { ...food, id: '' };
    dispatch(changeFoodInfo(result));
  };

  return !food?.id ? (
    <BookmarkBox>
      <Title>즐겨찾는 식료품 목록에서 추가하기</Title>
      <List>
        {bookmark?.length ? (
          bookmark.map((item) => (
            <BookmarkItem key={item.id}>
              <FoodBox>
                {item?.imgUrl ? (
                  <Image
                    src={item.imgUrl}
                    alt={item.name}
                    width={70}
                    height={70}
                    priority
                  />
                ) : (
                  <Emoji unified={item.emoji} size={40} />
                )}
                <Info>{cutLetter(item.name, 12)}</Info>
              </FoodBox>
              <Btns>
                <Btn icon={faCartPlus} onClick={() => onAddFoodClick(item)} />
                <Btn icon={faTrashCan} onClick={() => onRemoveClick(item)} />
              </Btns>
            </BookmarkItem>
          ))
        ) : (
          <EmptyBox>아직 등록된 즐겨찾는 식료품이 없습니다.</EmptyBox>
        )}
      </List>
    </BookmarkBox>
  ) : (
    <>
      {tab === '즐겨찾는 식품' && (
        <BackBtn onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>뒤로가기</span>
        </BackBtn>
      )}
      {food?.imgUrl && (
        <ImgBox>
          <Image
            src={food.imgUrl as string}
            alt={food.name}
            width={100}
            height={100}
            priority
          />
        </ImgBox>
      )}
      <AddFoodForm />
    </>
  );
};

const EmptyBox = tw.div`
  text-center
  p-8
  text-md
  rounded-lg
  bg-white
  shadow-xl
  col-span-2
  tablet:col-span-3
`;

const BookmarkBox = tw.div`
  w-full
  h-full
  overflow-scroll
  scrollbar-hide
`;

const List = tw.ul`
  grid
  grid-cols-2
  auto-rows-min
  gap-2
  tablet:grid-cols-3
  tablet:h-[95vh]
  desktop:h-[93vh]
`;

const BookmarkItem = tw.li`
  bg-white
  p-3
  rounded-xl
  shadow-md
  flex
  h-32
  justify-between
  items-center
  gap-2
`;

const FoodBox = tw.div`
  relative
  w-full
  h-fit
  flex
  flex-col
  justify-between
  gap-1
  item-center
`;

const ImgBox = tw.div`
  relative
  w-fit
  h-fit
  mb-3
`;

const Btns = tw.div`
  gap-8
  flex
  flex-col
  justify-center
`;

const Btn = tw(FontAwesomeIcon)`
  w-5
  h-5
  cursor-pointer
  first:text-blue-dark
  text-red-light
`;

const Info = tw.div`
  w-full
  h-12
  flex 
  flex-col
  justify-center
  text-center
  text-sm
  break-words
`;

export default BookmarkList;
