import { Emoji, EmojiStyle } from 'emoji-picker-react';
import { categoryConfig, Picker, previewConfig } from '../../utils/emojiConfig';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { showEmoji } from 'src/lib/slice/index';
import { useSubmitFood } from 'src/hooks';
import styles from 'styles/EmojiBox.module.css';
import tw from 'tailwind-styled-components';
import { Desc } from './FoodQuantity';

const FoodIconName = () => {
  const { emoji } = useAppSelector((state) => state.emoji);
  const { food } = useAppSelector((state) => state.food);
  const { onEmojiClick, onNameChange } = useSubmitFood();
  const dispatch = useAppDispatch();

  return (
    <>
      {!food.imgUrl && (
        <>
          <IconBox className={styles.emojiBox}>
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
          </IconBox>
          <Desc>아이콘을 선택해주세요.</Desc>
        </>
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
  h-10
  px-2
  text-base
  focus:outline-yellow
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
