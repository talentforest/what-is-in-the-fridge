import {
  faPen,
  faRightLeft,
  faSearch,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { FormEvent } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeTab } from 'src/lib/slice';
import tw from 'tailwind-styled-components';

interface ITabBtnProps {
  onDesktopClick: () => void;
}

const TabBtns = ({ onDesktopClick }: ITabBtnProps) => {
  const { tab } = useAppSelector((state) => state.tab);
  const { close } = useAppSelector((state) => state.addFoodArea);
  const dispatch = useAppDispatch();

  const onTabBtnClick = (e: FormEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    if (close) {
      onDesktopClick();
    }
    dispatch(changeTab(name));
  };

  return (
    <TabBox>
      <TabBtn onClick={onDesktopClick}>
        <FontAwesomeIcon icon={faRightLeft} size='2x' color='#aaa' />
      </TabBtn>
      <TabBtn name='search' onClick={onTabBtnClick} $color={tab === 'search'}>
        <FontAwesomeIcon
          icon={faSearch}
          size='xl'
          color={tab === 'search' ? 'gold' : '#666'}
        />
      </TabBtn>
      <TabBtn name='input' onClick={onTabBtnClick} $color={tab === 'input'}>
        <FontAwesomeIcon
          icon={faPen}
          size='xl'
          color={tab === 'input' ? 'gold' : '#666'}
        />
      </TabBtn>
      <TabBtn
        name='bookmark'
        onClick={onTabBtnClick}
        $color={tab === 'bookmark'}
      >
        <FontAwesomeIcon
          icon={faStar}
          size='xl'
          color={tab === 'bookmark' ? 'gold' : '#666'}
        />
      </TabBtn>
    </TabBox>
  );
};

const TabBox = tw.div`
  absolute
  top-12
  tablet:-right-12
  mobile:-right-9
  flex
  flex-col
  gap-1
`;
const TabBtn = tw(motion.button)<{ $color: boolean }>`
  first:bg-gray-light
  tablet:first:block
  mobile:first:hidden
  ${(p: { $color: boolean }) => (p.$color ? 'bg-blue-dark' : 'bg-yellow')}
  tablet:w-12
  tablet:h-12
  mobile:w-9
  mobile:h-10
  pr-1
  rounded-r-xl
  z-5
  shadow-md
  text-[10px]
  p-1
`;

export default TabBtns;
