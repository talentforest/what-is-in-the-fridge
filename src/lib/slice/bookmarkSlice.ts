import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bookmark: [
    {
      id: 'bookmark_example',
      name: '삼겹살',
      type: '🥩 정육,수산',
      emoji: '1f969',
      imgUrl: '',
      bookmark: true,
    },
  ],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    changeBookmark: (state, action) => {
      state.bookmark = action.payload;
    },
  },
});

const { reducer: changeBookmarkReducer } = bookmarkSlice;

export const { changeBookmark } = bookmarkSlice.actions;

export default changeBookmarkReducer;
