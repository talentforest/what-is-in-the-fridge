import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emoji: false,
};

const showEmojiBoxSlice = createSlice({
  name: 'emoji',
  initialState,
  reducers: {
    showEmojiBox: (state) => {
      state.emoji = !state.emoji;
    },
  },
});

const { reducer: showEmojiBoxReducer } = showEmojiBoxSlice;

export const { showEmojiBox } = showEmojiBoxSlice.actions;

export default showEmojiBoxReducer;
