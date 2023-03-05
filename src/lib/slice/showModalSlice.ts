import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  storedFoodModal: false,
  newFoodModal: false,
};

const showFoodModalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleStoredFoodModal: (state) => {
      state.storedFoodModal = !state.storedFoodModal;
    },
    toggleNewFoodModal: (state) => {
      state.newFoodModal = !state.newFoodModal;
    },
  },
});

const { reducer: showModalReducer } = showFoodModalSlice;

export const { toggleStoredFoodModal, toggleNewFoodModal } =
  showFoodModalSlice.actions;

export default showModalReducer;
