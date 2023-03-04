import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tab: '식품 검색',
};

const tabSlice = createSlice({
  name: 'tab',
  initialState,
  reducers: {
    changeTab: (state, action) => {
      state.tab = action.payload;
    },
  },
});

const { reducer: changeTabReducer } = tabSlice;

export const { changeTab } = tabSlice.actions;

export default changeTabReducer;
