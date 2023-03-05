import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { categoryConfig, Picker, previewConfig } from 'src/utils/emojiConfig';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { showEmojiBox } from 'src/lib/slice/index';
import { useSubmitFood } from 'src/hooks';
import { useEffect, useRef } from 'react';
import { Desc } from './FoodQuantity';
import styles from 'styles/emojiBox.module.css';
import tw from 'tailwind-styled-components';

const FoodIconName = () => {
  const { emoji } = useAppSelector((state) => state.emojiBox);
  const { newFood } = useAppSelector((state) => state.newFood);
  const { close } = useAppSelector((state) => state.addFoodSection);
  const { onEmojiClick, onNameChange } = useSubmitFood();
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!close) {
      inputRef.current?.focus();
    }
  }, [close]);

  return (
    <>
      {!newFood.imgUrl && (
        <>
          <IconBox className={styles.emojiBox}>
            <Icon onClick={() => dispatch(showEmojiBox())}>
              <Emoji
                unified={newFood.emoji}
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
          </IconBox>
          <Desc>아이콘을 선택해주세요.</Desc>
        </>
      )}
      <Input
        ref={inputRef}
        type='text'
        placeholder='식료품의 이름을 적어주세요.'
        value={newFood.name}
        onChange={onNameChange}
      />
    </>
  );
};

export const Input = tw.input`
  rounded-lg
  shadow-md
  w-full
  h-10
  px-2
  text-base
  focus:outline-yellow
  appearance-none
`;

const IconBox = tw.div`
  w-fit
  h-fit
  mb-1
`;

const Icon = tw.div`
  flex
  justify-center
  items-center
  cursor-pointer
  rounded-lg
  w-12
  h-12
  bg-white
  shadow-md
`;

export default FoodIconName;
