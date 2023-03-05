import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  close: true,
};

const showAddFoodSectionSlice = createSlice({
  name: 'addFoodSection',
  initialState,
  reducers: {
    toggleSlide: (state) => {
      state.close = !state.close;
    },
  },
});

const { reducer: addFoodSectionReducer } = showAddFoodSectionSlice;

export const { toggleSlide } = showAddFoodSectionSlice.actions;

export default addFoodSectionReducer;
