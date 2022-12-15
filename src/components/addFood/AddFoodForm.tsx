import tw from 'tailwind-styled-components';
import FoodType from '../addFood/FoodType';
import ExpiryDate from '../addFood/ExpiryDate';
import FoodIconName from '../addFood/FoodIconName';
import FoodQuantity from '../addFood/FoodQuantity';

interface IAddFoodFormProps {
  onSubmit: (e: React.FormEvent<HTMLButtonElement>) => void;
}

const AddFoodForm = ({ onSubmit }: IAddFoodFormProps) => {
  return (
    <Form>
      <AddFoodHeader>
        <Title>냉장실 식료품 추가하기</Title>
      </AddFoodHeader>
      <FoodForm onSubmit={onSubmit}>
        <ItemTitle>식료품 카테고리 선택</ItemTitle>
        <FoodType />
        <ItemTitle>식료품 이름</ItemTitle>
        <FoodIconName />
        <ItemTitle>식료품 개수</ItemTitle>
        <FoodQuantity />
        <ItemTitle>식료품 유통기한</ItemTitle>
        <ExpiryDate />
        <SubmitBtn>냉장고에 식품 추가하기</SubmitBtn>
      </FoodForm>
    </Form>
  );
};

const Form = tw.div`
  z-10
  bg-orange-light
  w-64
  p-4
  rounded-r-3xl
  absolute
  top-0
  left-0
  h-full
  shadow-xl
`;

const AddFoodHeader = tw.header`
  flex
  justify-between
  items-center
`;
const Title = tw.h2`
text-gray-dark
  font-bold
`;
const FoodForm = tw.form`
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
