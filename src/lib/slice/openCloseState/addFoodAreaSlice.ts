import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  close: false,
  open: false,
};

const addFoodAreaSlice = createSlice({
  name: 'addFoodArea',
  initialState,
  reducers: {
    closeAddFoodArea: (state) => {
      state.close = !state.close;
    },
    openAddFoodArea: (state) => {
      state.open = !state.open;
    },
  },
});

const { reducer: addFoodAreaReducer } = addFoodAreaSlice;

export const { closeAddFoodArea, openAddFoodArea } = addFoodAreaSlice.actions;

export default addFoodAreaReducer;
