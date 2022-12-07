import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foodModal: false,
};

const showFoodModalSlice = createSlice({
  name: 'foodModal',
  initialState,
  reducers: {
    showFoodModal: (state) => {
      state.foodModal = !state.foodModal;
    },
  },
});

const { reducer: showFoodModalReducer } = showFoodModalSlice;

export const { showFoodModal } = showFoodModalSlice.actions;

export default showFoodModalReducer;
