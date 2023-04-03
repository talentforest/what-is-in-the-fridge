import { faCartPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSearchFood } from 'src/hooks';
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
      <Image
        src={imgurl1}
        alt={prdlstNm}
        width={300}
        height={300}
        className='h-28 w-28 object-cover'
        unoptimized
      />
      <PlusCartBtn
        role='button'
        onClick={() => onCartIconClick(prdlstNm, imgurl1)}
        icon={faCartPlus}
        size='lg'
      />
      <Info>
        {cutLetter(prdlstNm, 15)}
        {!(capacity === '알수없음') && capacity?.slice(0, 4)}
      </Info>
    </ResultItem>
  );
};

const ResultItem = tw.div`
  relative
  bg-white
  p-2
  rounded-lg
  shadow-xl
  flex
  flex-col
  justify-between
  items-center
  gap-1
  h-36
`;

const PlusCartBtn = tw(FontAwesomeIcon)`
  shadow-md
  bg-blue-dark
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
