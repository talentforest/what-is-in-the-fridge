import { ChangeEvent } from 'react';
import { Emoji, EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { categoryConfig, Picker, previewConfig } from '../../utils/emojiConfig';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { showEmoji } from 'src/lib/slice/openCloseState/showEmojiSlice';
import { changeFoodInfo } from 'src/lib/slice/foodSlice';
import styles from 'styles/EmojiBox.module.css';
import tw from 'tailwind-styled-components';

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
      {!food.imgUrl && (
        <div className={styles.emojiBox}>
          <Icon onClick={() => dispatch(showEmoji())}>
            <Emoji
              unified={food.emoji}
              size={30}
              emojiStyle={EmojiStyle.APPLE}
            />
          </Icon>
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
          <Desc>아이콘을 선택해주세요.</Desc>
        </div>
      )}
      <Input
        type='text'
        placeholder='식료품의 이름을 적어주세요.'
        value={food.name}
        onChange={onNameChange}
      />
    </>
  );
};

export const Input = tw.input`
  rounded-lg
  shadow-lg
  w-full
  h-8
  p-2
  text-[13px]
  focus:outline-yellow
`;
const Icon = tw.div`
  flex
  justify-center
  items-center
  cursor-pointer
  rounded-lg
  w-12
  h-12
  bg-yellow-light
  shadow-lg
`;
const Desc = tw.span`
  text-xs
  text-orange
`;
export default FoodIconName;
