import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  freezer: false,
};

const showFreezerSlice = createSlice({
  name: 'freezer',
  initialState,
  reducers: {
    showFreezer: (state) => {
      state.freezer = !state.freezer;
    },
  },
});

const { reducer: showFreezerReducer } = showFreezerSlice;

export const { showFreezer } = showFreezerSlice.actions;

export default showFreezerReducer;
