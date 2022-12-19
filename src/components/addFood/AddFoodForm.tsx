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
    <>
      <SubTitle>식료품 정보 추가하기</SubTitle>
      <Form onSubmit={onSubmit}>
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
      </Form>
    </>
  );
};

const SubTitle = tw.h4`
  text-[14px]
`;
const Form = tw.form`
  mobile:h-[calc(100vh-theme(spacing.24))]
  overflow-auto
  rounded-lg
  mt-1
`;
const ImgBox = tw.div`
  relative
  w-28
  h-28
  rounded-lg
  mt-1
`;
const Img = tw(Image)`
  rounded-lg
  border
  object-cover
  object-center
`;
const ItemTitle = tw.h4`
  text-gray
  text-[14px]
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
