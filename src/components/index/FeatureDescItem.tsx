import Image from 'next/image';
import tw from 'tailwind-styled-components';

interface IFeatureDescItemProps {
  contents: string;
  imgUrl: string;
}

const FeatureDescItem = ({ contents, imgUrl }: IFeatureDescItemProps) => {
  return (
    <Item>
      <Desc>{contents}</Desc>
      <ImgBox>
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
  justify-center
  items-center
  gap-3
  px-5
  py-10
  tablet:mb-0
  mobile:mb-4
  tablet:rounded-3xl
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
