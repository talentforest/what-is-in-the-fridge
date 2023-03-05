import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tabBtn: '식품 검색',
};

const tabBtnSlice = createSlice({
  name: 'tabBtn',
  initialState,
  reducers: {
    changeTabBtn: (state, action) => {
      state.tabBtn = action.payload;
    },
  },
});

const { reducer: changeTabBtnReducer } = tabBtnSlice;

export const { changeTabBtn } = tabBtnSlice.actions;

export default changeTabBtnReducer;
