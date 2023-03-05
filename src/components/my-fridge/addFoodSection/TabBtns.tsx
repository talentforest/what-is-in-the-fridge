import { faPen, faSearch, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';
import { FormEvent, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { changeTabBtn } from 'src/lib/slice';
import tw from 'tailwind-styled-components';

interface ITabBtnProps {
  onSlideClick: () => void;
  children: ReactNode;
}

const btns = [
  { icon: faSearch, name: '식품 검색' },
  { icon: faPen, name: '직접 식품 입력' },
  { icon: faStar, name: '즐겨찾는 식품' },
];

const TabBtns = ({ onSlideClick, children }: ITabBtnProps) => {
  const { tabBtn } = useAppSelector((state) => state.tabBtn);
  const { close } = useAppSelector((state) => state.addFoodSection);
  const dispatch = useAppDispatch();

  const onTabBtnClick = (e: FormEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    if (close) {
      onSlideClick();
    }
    dispatch(changeTabBtn(name));
  };

  return (
    <TabBox>
      {children}
      {btns.map((btn) => (
        <TabBtn
          key={btn.name}
          name={btn.name}
          onClick={onTabBtnClick}
          $color={tabBtn === btn.name}
        >
          <FontAwesomeIcon
            icon={btn.icon}
            color={tabBtn === btn.name ? 'gold' : '#666'}
          />
          <Name $color={tabBtn === btn.name}>{btn.name}</Name>
        </TabBtn>
      ))}
    </TabBox>
  );
};

const TabBox = tw.div`
  absolute
  top-12
  -right-12
  flex
  flex-col
  gap-1.5
  tablet:top-14
  tablet:-right-12
`;

export const TabBtn = tw(motion.button)<{ $color: boolean }>`
  ${(p: { $color: boolean }) => (p.$color ? 'bg-blue-dark' : 'bg-yellow')}
  z-5
  w-12
  h-16
  flex
  flex-col
  justify-center
  items-center
  gap-2
  p-1
  text-md
  text-blue-dark
  font-bold
  rounded-r-xl
  shadow-md
  transition
`;

export const Name = tw.span<{ $color: boolean }>`
  text-[10px]
  ${(p: { $color: boolean }) => (p.$color ? 'text-white' : 'text-blue-dark')}
`;

export default TabBtns;
