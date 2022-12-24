import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  freezerOpen: false,
  fridgeOpen: false,
};

const doorOpenSlice = createSlice({
  name: 'doorOpen',
  initialState,
  reducers: {
    changeFreezerOpen: (state) => {
      state.freezerOpen = !state.freezerOpen;
    },
    changeFridgeOpen: (state) => {
      state.fridgeOpen = !state.fridgeOpen;
    },
  },
});

const { reducer: changeDoorReducer } = doorOpenSlice;

export const { changeFreezerOpen, changeFridgeOpen } = doorOpenSlice.actions;

export default changeDoorReducer;
