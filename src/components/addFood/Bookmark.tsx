import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Emoji } from 'emoji-picker-react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { cutLetter } from 'src/utils/cutLetter';
import tw from 'tailwind-styled-components';
import {
  faCartPlus,
  faCircleCheck,
  faEdit,
  faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { changeFoodInfo, removeBookmark } from 'src/lib/slice';
import { useEditFoodInfo, useSubmitFood } from 'src/hooks';
import { initialState } from 'src/hooks/useAddFood';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import AddFoodForm from '../addFood/AddFoodForm';

const Bookmark = ({ tab }: { tab: string }) => {
  const { food } = useAppSelector((state) => state.food);
  const { onSubmit } = useSubmitFood();
  const { bookmark } = useAppSelector((state) => state.bookmark);
  const { addedFood } = useAppSelector((state) => state.addedFood);
  const dispatch = useAppDispatch();
  const { changeBookmarkStateInArr } = useEditFoodInfo();

  useEffect(() => {
    if (tab === 'bookmark') {
      dispatch(changeFoodInfo(initialState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRemoveClick = (item: any) => {
    // 즐겨찾는 식품 리스트에서 삭제 버튼 누르면
    dispatch(removeBookmark(item));
    // 추가된 식품에서도 북마크 해제
    changeBookmarkStateInArr();
  };

  const onAddFoodClick = (item: any) => {
    const result = {
      ...food,
      id: uuidv4(),
      imgUrl: item.imgUrl,
      name: item.name,
      type: item.type,
      emoji: item.emoji,
      bookmark: true,
    };

    dispatch(changeFoodInfo(result));
  };

  return !food?.id ? (
    <Wrapper>
      <Header>
        <Title>즐겨찾는 식료품 목록에서 추가하기</Title>
      </Header>
      <BookmarkBox>
        {bookmark.map((item) => (
          <BookmarkItem key={item.id}>
            <Btn
              color='#666'
              icon={faTrashCan}
              onClick={() => {
                onRemoveClick(item);
              }}
            />
            <Btn
              icon={faCartPlus}
              color='#295bff'
              onClick={() => onAddFoodClick(item)}
            />
            <ImgBox>
              {item?.imgUrl ? (
                <ImgBox>
                  <Img
                    src={item?.imgUrl}
                    alt='Picture of Food'
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
            <Info>{cutLetter(item.name, 12)}</Info>
          </BookmarkItem>
        ))}
      </BookmarkBox>
    </Wrapper>
  ) : (
    <AddFoodForm onSubmit={onSubmit} tab={tab} />
  );
};

const Header = tw.header` 
  flex
  justify-between
  items-center
  mb-3
`;
const Title = tw.h1`
  text-md
`;
const Wrapper = tw.div`
  w-full
  h-full
  overflow-auto
`;
const BookmarkBox = tw.div`
  grid
  grid-cols-3
  mt-1
  -mx-2
  px-3
  pb-4
  auto-rows-min
  gap-2
  h-[calc(100vh-theme(spacing.56))]
  rounded-3xl
  overflow-scroll
`;
const BookmarkItem = tw.div`
  relative
  bg-white
  p-2
  rounded-xl
  shadow-lg
  flex
  flex-col
  justify-between
  items-center
  gap-1
  h-[85px]
`;
const Btn = tw(FontAwesomeIcon)`
  absolute
  z-10
  right-2
  top-8
  w-4
  h-4
  cursor-pointer
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

export default Bookmark;
