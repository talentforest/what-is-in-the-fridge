import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  food_modal: false,
};

const showFoodModalSlice = createSlice({
  name: 'food_modal',
  initialState,
  reducers: {
    showFoodModal: (state) => {
      state.food_modal = !state.food_modal;
    },
  },
});

const { reducer: showFoodModalReducer } = showFoodModalSlice;

export const { showFoodModal } = showFoodModalSlice.actions;

export default showFoodModalReducer;
