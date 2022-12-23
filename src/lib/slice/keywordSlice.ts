import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
};

const keywordSlice = createSlice({
  name: 'keyword',
  initialState,
  reducers: {
    changeKeyword: (state, action) => {
      state.keyword = action.payload;
    },
  },
});

const { reducer: changeKeywordReducer } = keywordSlice;

export const { changeKeyword } = keywordSlice.actions;

export default changeKeywordReducer;
