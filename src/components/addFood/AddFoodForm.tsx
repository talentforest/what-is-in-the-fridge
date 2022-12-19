import tw from 'tailwind-styled-components';
import FoodType from '../addFood/FoodType';
import ExpiryDate from '../addFood/ExpiryDate';
import FoodIconName from '../addFood/FoodIconName';
import FoodQuantity from '../addFood/FoodQuantity';
import { useAppSelector } from 'src/lib/hooks';
import Image from 'next/image';

interface IAddFoodFormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddFoodForm = ({ onSubmit }: IAddFoodFormProps) => {
  const { food } = useAppSelector((state) => state.food);

  return (
    <form onSubmit={onSubmit}>
      {food.imgUrl && (
        <ImgBox>
          <Img
            src={food.imgUrl}
            alt='Picture of Food'
            fill
            sizes='(max-width: 768px) 300px,
            (max-width: 1200px) 100px,
            30px'
            priority
          />
        </ImgBox>
      )}
      <ItemTitle>식료품 이름</ItemTitle>
      <FoodIconName />
      <ItemTitle>식료품 카테고리 선택</ItemTitle>
      <FoodType />
      <ItemTitle>식료품 개수</ItemTitle>
      <FoodQuantity />
      <ItemTitle>식료품 유통기한</ItemTitle>
      <ExpiryDate />
      <SubmitBtn>냉장고에 식품 추가하기</SubmitBtn>
    </form>
  );
};

const ImgBox = tw.div`
  relative
  w-20
  h-20
  rounded-lg
  mt-3
`;
const Img = tw(Image)`
  rounded-lg
  border
  object-cover
  object-center
`;
const ItemTitle = tw.h4`
  text-gray
  text-xs 
  mb-2
  mt-5
`;
const SubmitBtn = tw.button`
  w-full
  mt-4
  rounded-lg
  bg-green
  p-2
  text-xs 
  text-gray-dark
  font-bold
  shadow-md
`;

export default AddFoodForm;
