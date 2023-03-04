import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  close: true,
};

const addFoodAreaSlice = createSlice({
  name: 'addFoodArea',
  initialState,
  reducers: {
    closeAddFoodArea: (state) => {
      state.close = !state.close;
    },
  },
});

const { reducer: addFoodAreaReducer } = addFoodAreaSlice;

export const { closeAddFoodArea } = addFoodAreaSlice.actions;

export default addFoodAreaReducer;
