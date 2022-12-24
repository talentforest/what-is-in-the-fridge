import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  freezerMode: false,
};

const freezerModeSlice = createSlice({
  name: 'freezerMode',
  initialState,
  reducers: {
    changeMode: (state) => {
      state.freezerMode = !state.freezerMode;
    },
    changeFreezerMode: (state) => {
      state.freezerMode = true;
    },
    changeFridgeMode: (state) => {
      state.freezerMode = false;
    },
  },
});

const { reducer: changeModeReducer } = freezerModeSlice;

export const { changeMode, changeFreezerMode, changeFridgeMode } =
  freezerModeSlice.actions;

export default changeModeReducer;
