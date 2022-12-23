import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import tw from 'tailwind-styled-components';

const BookmarkBtn = () => {
  return (
    <Bookmark>
      <FontAwesomeIcon icon={faStar} size='3x' color='gold' />
      <span>즐겨찾는 식품</span>
    </Bookmark>
  );
};

const Bookmark = tw.button`
text-white
bg-gray
shadow-xl
rounded-full
tablet:h-36
tablet:w-36
mobile:w-24
mobile:h-24
absolute
tablet:bottom-8
tablet:right-8
mobile:bottom-4
mobile:right-4
flex
flex-col
gap-3
justify-center
items-center
text-[11px]
`;

export default BookmarkBtn;
