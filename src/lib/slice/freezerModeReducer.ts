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
  },
});

const { reducer: changeModeReducer } = freezerModeSlice;

export const { changeMode } = freezerModeSlice.actions;

export default changeModeReducer;
