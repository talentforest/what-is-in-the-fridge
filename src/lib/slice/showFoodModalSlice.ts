import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: false,
};

const showFoodModalSlice = createSlice({
  name: 'foodModal',
  initialState,
  reducers: {
    showFoodModal: (state) => {
      state.modal = !state.modal;
    },
  },
});

const { reducer: showFoodModalReducer } = showFoodModalSlice;

export const { showFoodModal } = showFoodModalSlice.actions;

export default showFoodModalReducer;
