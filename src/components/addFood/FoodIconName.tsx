import styles from 'styles/EmojiBox.module.css';
import { ChangeEvent } from 'react';
import { Emoji, EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { categoryConfig, Picker, previewConfig } from '../../utils/emojiConfig';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { showEmoji } from 'src/lib/slice/openCloseState/showEmojiSlice';
import { changeFoodInfo } from 'src/lib/slice/foodSlice';
import tw from 'tailwind-styled-components';
import styled from 'styled-components';

const FoodIconName = () => {
  const { emoji } = useAppSelector((state) => state.emoji);
  const { food } = useAppSelector((state) => state.food);
  const dispatch = useAppDispatch();

  const onEmojiClick = (emojiData: EmojiClickData) => {
    const result = {
      ...food,
      emoji: emojiData.unified,
    };
    dispatch(changeFoodInfo(result));
    dispatch(showEmoji());
  };

  const onNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    const result = {
      ...food,
      name: e.currentTarget.value,
    };
    dispatch(changeFoodInfo(result));
  };

  return (
    <>
      <div className={styles.emojiBox}>
        <Icon onClick={() => dispatch(showEmoji())}>
          <Emoji unified={food.emoji} size={20} emojiStyle={EmojiStyle.APPLE} />
        </Icon>
        <Input
          type='text'
          placeholder='식료품의 이름을 적어주세요.'
          value={food.name}
          onChange={onNameChange}
        />
        {emoji && (
          <Picker
            onEmojiClick={onEmojiClick}
            previewConfig={previewConfig}
            categories={categoryConfig}
            width='250px'
            height='300px'
            skinTonesDisabled={true}
          />
        )}
      </div>
      <Desc>아이콘을 선택해주세요.</Desc>
    </>
  );
};

export const Input = tw.input`
  rounded-lg
  shadow-lg
  w-full
  h-8
  p-2
  text-[14px]
  focus:outline-yellow
`;
const Icon = tw.div`
  flex
  justify-center
  items-center
  cursor-pointer
  rounded-lg
  w-10
  h-8
  bg-yellow-light
  shadow-lg
`;
const Desc = tw.span`
  text-xs
  text-orange
`;
export default FoodIconName;
