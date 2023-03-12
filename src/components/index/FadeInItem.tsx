import tw from 'tailwind-styled-components';
import Image from 'next/image';

interface IFadeInItem {
  item: {
    id: number;
    desc: string;
    img: string;
  };
  smImg?: boolean;
}

const FadeInItem = ({ item, smImg }: IFadeInItem) => {
  const { desc, img } = item;

  return (
    <Item>
      <ItemDesc>{desc}</ItemDesc>
      <Image
        src={`/assets/${img}.png`}
        alt={img}
        width={smImg ? 180 : 400}
        height={120}
        priority
        className='p-2 w-auto h-auto'
      />
    </Item>
  );
};

const Item = tw.li`
  flex
  flex-col
  justify-between
  items-center
  w-full
  rounded-xl
  shadow-lg
  border-2
  border-dashed
  border-gray
  bg-white
`;

const ItemDesc = tw.span`
  text-center
  w-full
  h-20
  flex
  items-center
  justify-center
  p-3
  rounded-t-xl
  bg-yellow
  text-base
`;

export default FadeInItem;
