import tw from 'tailwind-styled-components';
import FoodType from '../addFood/FoodType';
import ExpiryDate from '../addFood/ExpiryDate';
import FoodIconName from '../addFood/FoodIconName';
import FoodQuantity from '../addFood/FoodQuantity';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { changeFoodInfo } from 'src/lib/slice';
import { useEffect } from 'react';
import { initialState } from 'src/hooks/useAddFood';
import { Title } from './SearchResult';

interface IAddFoodFormProps {
  tab?: string;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const AddFoodForm = ({ tab, onSubmit }: IAddFoodFormProps) => {
  const { food } = useAppSelector((state) => state.food);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tab === 'input') {
      dispatch(changeFoodInfo(initialState));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onBackClick = () => {
    const result = { ...food, id: '' };
    dispatch(changeFoodInfo(result));
  };

  return (
    <>
      {tab === 'search' && (
        <BackBtn onClick={onBackClick}>
          <FontAwesomeIcon icon={faChevronLeft} />
          <span>뒤로가기</span>
        </BackBtn>
      )}
      {tab === 'input' && <Title>직접 식료품 정보 입력하기</Title>}
      {tab === 'bookmark' && <Title>즐겨찾는 식료품 추가 정보 입력하기</Title>}
      <Form onSubmit={onSubmit}>
        {food?.imgUrl && (
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

const BackBtn = tw.button`
  w-fit
  text-[14px]
  flex
  gap-1
  items-center
  mb-3
`;
const Form = tw.form`
  mobile:h-[calc(100vh-theme(spacing.24))]
  overflow-auto
  rounded-lg
`;
const ImgBox = tw.div`
  relative
  w-24
  h-24
  rounded-lg
  shadow-md
  bg-white
`;
const Img = tw(Image)`
  rounded-lg
  object-cover
  object-center
`;
const ItemTitle = tw.h4`
  text-gray
  text-[14px]
  mb-2
  mt-5
  first:mt-0
`;
const SubmitBtn = tw.button`
  w-full
  mt-4
  rounded-lg
  bg-green
  p-2
  text-md
  text-gray-dark
  font-bold
  shadow-md
`;

export default AddFoodForm;
