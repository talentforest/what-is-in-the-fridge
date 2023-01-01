import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Emoji } from 'emoji-picker-react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { cutLetter } from 'src/utils/cutLetter';
import { faCartPlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';
import { changeFoodInfo } from 'src/lib/slice';
import { initialState } from 'src/hooks/useAddFood';
import { useHandleBookmark } from 'src/hooks';
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
    if (tab === 'bookmark') {
      dispatch(changeFoodInfo(initialState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !food?.id ? (
    <Wrapper>
      <Title>즐겨찾는 식료품 목록에서 추가하기</Title>
      <List>
        {bookmark?.length ? (
          bookmark.map((item) => (
            <BookmarkItem key={item.id}>
              <ImgBox>
                {item?.imgUrl ? (
                  <ImgBox>
                    <Img
                      src={item.imgUrl}
                      alt={item.name}
                      fill
                      sizes='(max-width: 768px) 300px,
                    (max-width: 1200px) 100px,
                    30px'
                      priority
                    />
                  </ImgBox>
                ) : (
                  <Emoji unified={item.emoji} size={35} />
                )}
              </ImgBox>
              <Info>{cutLetter(item.name, 14)}</Info>
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
    </Wrapper>
  ) : (
    <AddFoodForm />
  );
};

const EmptyBox = tw.div`
  text-center
  p-8
  text-md
  tablet:col-span-3
  mobile:col-span-2
  rounded-lg
  bg-white
  shadow-xl
`;
const Title = tw.h2`
  text-md
`;
const Wrapper = tw.div`
  w-full
  h-full
`;
const List = tw.div`
  scrollbar-hide
  p-2
  -mx-2
  mt-2
  grid
  tablet:grid-cols-3
  mobile:grid-cols-2
  auto-rows-min
  gap-2
  desktop:h-[90vh]
  tablet:h-[95vh]
  mobile:h-[90vh]
  rounded-3xl
  overflow-scroll
`;
const BookmarkItem = tw.div`
  bg-white
  p-2
  rounded-xl
  shadow-lg
  flex
  flex-col
  justify-between
  items-center
  gap-1
  h-28
`;
const Btns = tw.div`
  w-full
  flex
  justify-between
`;
const Btn = tw(FontAwesomeIcon)`
  w-4
  h-4
  cursor-pointer
  first:text-blue-dark
  text-gray
`;
const ImgBox = tw.div`
  border-gray-light
  relative
  w-10
  h-10
  rounded-lg
  flex
  justify-center
  items-center
`;
const Img = tw(Image)`
  rounded-lg
  object-cover
  object-center
`;
const Info = tw.div`
  h-5
  flex 
  flex-col
  justify-center
  text-center
  text-[11px]
  break-words
  w-full
`;

export default BookmarkList;
