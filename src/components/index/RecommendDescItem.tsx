import tw from 'tailwind-styled-components';
import Image from 'next/image';
import { useRef } from 'react';
import { useScrollFadeIn } from 'src/hooks';

interface IRecommendDescItemProps {
  contents: string;
  imgUrl: string;
}

const RecommendDescItem = ({ contents, imgUrl }: IRecommendDescItemProps) => {
  const targetDom = useRef<HTMLElement>(null);
  const { style } = useScrollFadeIn({ targetDom });

  return (
    <Item ref={targetDom} style={{ ...style }}>
      <Desc>{contents}</Desc>
      <ImgBox>
        <Image
          src={imgUrl}
          alt='집밥요리'
          fill
          sizes='(max-width: 768px) 300px,
          (max-width: 1200px) 100px,
          30px'
          priority
        />
      </ImgBox>
    </Item>
  );
};

const Item = tw.li`
  shadow-xl
  rounded-xl
  relative
  m-auto
  w-4/5
  h-40
  flex 
  flex-col
  bg-yellow
  items-center
  gap-2
  px-10
  py-5
  tablet:mb-20
  mobile:mb-40
  tablet:rounded-3xl
`;
const Desc = tw.p` 
  text-center
  break-keep
  w-48
`;
const ImgBox = tw.div`
  absolute
  -bottom-20
  w-40
  h-40
  rounded-full
  flex
  justify-center
  items-center
  overflow-hidden
  shadow-xl
`;

export default RecommendDescItem;
