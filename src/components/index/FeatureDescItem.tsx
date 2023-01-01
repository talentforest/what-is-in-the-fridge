import Image from 'next/image';
import { useRef } from 'react';
import { useScrollFadeIn } from 'src/hooks';
import tw from 'tailwind-styled-components';

interface IFeatureDescItemProps {
  contents: string;
  imgUrl: string;
}

const FeatureDescItem = ({ contents, imgUrl }: IFeatureDescItemProps) => {
  const targetDom = useRef<HTMLElement>(null);
  const { style } = useScrollFadeIn({ targetDom });

  return (
    <Item>
      <Desc>{contents}</Desc>
      <ImgBox ref={targetDom} style={{ ...style }}>
        <Image
          src={imgUrl}
          alt='즐겨찾기 식품 리스트'
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
  flex 
  flex-col
  justify-between
  items-center
  gap-2
  tablet:mb-0
  mobile:mb-24
`;
const Desc = tw.p` 
  text-center
  w-56
  break-keep
  
`;
const ImgBox = tw.div`
  object-cover
  object-top
  w-60
  h-60
  relative
  flex
  justify-center
  items-center
  overflow-hidden
  shadow-2xl
  rounded-xl
`;

export default FeatureDescItem;
