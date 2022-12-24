import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Emoji } from 'emoji-picker-react';
import Image from 'next/image';
import { useAppSelector } from 'src/lib/hooks';
import { cutLetter } from 'src/utils/cutLetter';
import tw from 'tailwind-styled-components';
import { Title } from './SearchResult';

const Bookmark = () => {
  const { bookmark } = useAppSelector((state) => state.bookmark);

  return (
    <Wrapper>
      <Title>즐겨찾는 식품</Title>
      <BookmarkBox>
        {bookmark.map((item) => (
          <BookmarkItem key={item.id}>
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
                <Emoji unified={item.emoji} size={50} />
              )}
            </ImgBox>
            {/* <PlusCartBtn role='button' icon={faCartPlus} size='lg' /> */}
            <Info>{cutLetter(item.name, 15)}</Info>
          </BookmarkItem>
        ))}
      </BookmarkBox>
    </Wrapper>
  );
};

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
  h-24
`;
const PlusCartBtn = tw(FontAwesomeIcon)`
  shadow-md
  bg-red-light
  text-white
  hover:text-green
  hover:scale-105
  hover: ease-in-out
  hover:transition 
  hover:duration-300
  absolute
  -top-5
  right-4
  text-[14px]
  rounded-full
  p-2
  border
`;
const ImgBox = tw.div`
  border-gray-light
  relative
  w-16
  h-16
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
