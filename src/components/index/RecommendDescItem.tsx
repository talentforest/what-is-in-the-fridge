import tw from 'tailwind-styled-components';
import styles from 'styles/TiltBox.module.css';
import Image from 'next/image';

interface IRecommendDescItemProps {
  contents: string;
  imgUrl: string;
}

const RecommendDescItem = ({ contents, imgUrl }: IRecommendDescItemProps) => {
  return (
    <Item>
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
  m-auto
  w-4/5
  flex 
  flex-col
  justify-center
  items-center
  gap-2
  px-5
  py-10
  tablet:mb-0
  mobile:mb-4
  tablet:rounded-3xl
`;
const Desc = tw.p` 
  text-center
  break-keep
  w-48
`;
const ImgBox = tw.div`
  relative
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
