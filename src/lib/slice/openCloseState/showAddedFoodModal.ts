import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modal: false,
};

const showAddedFoodModalSlice = createSlice({
  name: 'addedFoodModal',
  initialState,
  reducers: {
    showAddedFoodModal: (state) => {
      state.modal = !state.modal;
    },
  },
});

const { reducer: showAddedFoodModalReducer } = showAddedFoodModalSlice;

export const { showAddedFoodModal } = showAddedFoodModalSlice.actions;

export default showAddedFoodModalReducer;
