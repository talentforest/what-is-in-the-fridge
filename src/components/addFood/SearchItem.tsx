import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchFood } from 'src/hooks/useSearchFood';
import { cutLetter } from 'src/utils/cutLetter';
import { IFoodData } from './SearchResult';
import tw from 'tailwind-styled-components';
import Image from 'next/image';

interface SearchItemProps {
  result: IFoodData;
}

const SearchItem = ({ result }: SearchItemProps) => {
  const { onCartIconClick } = useSearchFood();
  const {
    item: { imgurl1, prdlstNm, capacity },
  } = result;

  return (
    <ResultItem>
      <ImgBox>
        <Img
          src={imgurl1}
          alt={prdlstNm}
          fill
          sizes='(max-width: 768px) 100px,
          (max-width: 1200px) 50px,
          30px'
        />
      </ImgBox>
      <PlusCartBtn
        role='button'
        onClick={() => onCartIconClick(prdlstNm, imgurl1)}
        icon={faCartPlus}
        size='lg'
      />
      <Info>
        {cutLetter(prdlstNm, 15)}{' '}
        {!(capacity === '알수없음') && capacity?.slice(0, 4)}
      </Info>
    </ResultItem>
  );
};

const ResultItem = tw.div`
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
  h-36
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
  top-16
  right-4
  self-end
  text-[14px]
  rounded-full
  p-2
`;
const ImgBox = tw.div`
  border-gray-light
  relative
  w-24
  h-24
  rounded-lg
`;
const Img = tw(Image)`
  rounded-lg
  object-cover
  object-center
`;
const Info = tw.div`
  h-9
  flex 
  flex-col
  justify-center
  text-center
  text-[11px]
  break-words
  w-full
`;

export default SearchItem;
