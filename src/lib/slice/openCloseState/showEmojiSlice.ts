import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  emoji: false,
};

const showEmojiSlice = createSlice({
  name: 'emoji',
  initialState,
  reducers: {
    showEmoji: (state) => {
      state.emoji = !state.emoji;
    },
  },
});

const { reducer: showEmojiReducer } = showEmojiSlice;

export const { showEmoji } = showEmojiSlice.actions;

export default showEmojiReducer;
