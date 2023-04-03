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
import { changeNewFood } from 'src/lib/slice';
import { initialState } from 'src/hooks/useAddFood';
import { useHandleBookmark } from 'src/hooks';
import { BackBtn, Title } from './SearchResult';
import Image from 'next/image';
import AddFoodForm from './AddFoodForm';
import tw from 'tailwind-styled-components';

const BookmarkList = () => {
  const { tabBtn } = useAppSelector((state) => state.tabBtn);
  const { newFood } = useAppSelector((state) => state.newFood);
  const { bookmark } = useAppSelector((state) => state.bookmark);
  const { onRemoveClick, onAddFoodClick } = useHandleBookmark();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tabBtn === '즐겨찾는 식품') {
      dispatch(changeNewFood(initialState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackClick = () => {
    const result = { ...newFood, id: '' };
    dispatch(changeNewFood(result));
  };

  return !newFood?.id ? (
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
                    width={200}
                    height={200}
                    className='h-28 w-28 object-cover rounded-md shadow-md'
                    unoptimized
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
      {tabBtn === '즐겨찾는 식품' && (
        <BackBtn onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>뒤로가기</span>
        </BackBtn>
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
  pb-4
  overflow-hidden
`;

const List = tw.ul`
  overflow-scroll
  scrollbar-hide
  px-4
  pt-1
  pb-10
  h-full
  grid
  grid-cols-2
  auto-rows-min
  gap-2
  tablet:grid-cols-3
  tablet:h-[95vh]
  desktop:h-[93vh]
`;

const BookmarkItem = tw.li`
  flex
  justify-between
  items-center
  gap-2
  h-28
  p-1.5
  rounded-xl
  shadow-md
  bg-white
`;

const FoodBox = tw.div`
  relative
  flex
  flex-col
  justify-start
  items-center
  gap-1
  w-full
  h-fit
  pt-1
`;

const Btns = tw.div`
  flex
  flex-col
  justify-center
  gap-8
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
  h-10
  flex 
  flex-col
  justify-center
  text-center
  text-sm
  break-words
`;

export default BookmarkList;
