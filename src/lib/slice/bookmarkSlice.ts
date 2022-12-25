import { createSlice } from '@reduxjs/toolkit';
import { IFood } from './foodSlice';

const initialState = {
  bookmark: [] as IFood[],
};

const bookmarkSlice = createSlice({
  name: 'bookmark',
  initialState,
  reducers: {
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

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;

export default changeBookmarkReducer;
