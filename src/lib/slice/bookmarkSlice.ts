import { createSlice } from '@reduxjs/toolkit';
import { ISearchedFood } from './foodSlice';

const initialState = {
  bookmark: [] as ISearchedFood[],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
    modifyBookmark: (state, action) => {
      state.bookmark = action.payload;
    },
    addBookmark: (state, action) => {
      state.bookmark = [...state.bookmark, action.payload];
    },
    removeBookmark: (state, action) => {
      state.bookmark = state.bookmark.filter(
        (item) => item.name !== action.payload.name
      );
    },
  },
});

const { reducer: changeBookmarkReducer } = bookmarkSlice;

export const { modifyBookmark, addBookmark, removeBookmark } =
  bookmarkSlice.actions;

export default changeBookmarkReducer;
