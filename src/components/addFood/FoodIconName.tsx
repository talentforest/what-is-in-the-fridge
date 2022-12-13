import { ChangeEvent } from 'react';
import { Emoji, EmojiClickData, EmojiStyle } from 'emoji-picker-react';
import { categoryConfig, Picker, previewConfig } from '../../utils/emojiConfig';
import { useAppDispatch, useAppSelector } from 'src/lib/hooks';
import { showEmoji } from 'src/lib/slice/showEmojiSlice';
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
      <Name>
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
      </Name>
      <Desc>아이콘을 선택해주세요.</Desc>
    </>
  );
};

const Name = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 5px;
  height: 30px;
  aside {
    z-index: 20 !important;
    position: absolute !important;
    top: 55px;
    &.EmojiPickerReact {
      --epr-emoji-size: 20px !important;
      --epr-search-input-height: 30px !important;
      --epr-category-navigation-button-size: 20px !important;
      --epr-preview-height: 40px !important;
    }
    div {
      &.epr-header {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 80px !important;
      }
      &.epr-category-nav {
        padding: 0 10px !important;
        margin-bottom: 5px;
      }
      &.epr-body {
        ul {
          li {
            div {
              &.epr-emoji-category-label {
                background-color: #fff;
                z-index: 10;
              }
            }
          }
        }
      }
      &.epr-preview {
        align-items: center;
        gap: 5px;
        div {
          img {
            width: 25px !important;
            height: 25px !important;
          }
          &.epr-preview-emoji-label {
            padding-top: 3px !important;
          }
        }
      }
    }
  }
`;

export const Input = tw.input`
  rounded-lg
  shadow-lg
  w-full
  h-8
  p-2
  text-sm
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
