import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  close: false,
};

const closeAddFoodAreaSlice = createSlice({
  name: 'addFoodArea',
  initialState,
  reducers: {
    closeAddFoodArea: (state) => {
      state.close = !state.close;
    },
  },
});

const { reducer: addFoodCloseReducer } = closeAddFoodAreaSlice;

export const { closeAddFoodArea } = closeAddFoodAreaSlice.actions;

export default addFoodCloseReducer;
