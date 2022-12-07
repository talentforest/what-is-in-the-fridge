import { createSlice } from '@reduxjs/toolkit';
import { changeStrDate } from 'src/utils/changeStrDate';

const initialState = {
  food: {
    type: '',
    name: '',
    emoji: '1f34b',
    expiryDate: changeStrDate(new Date()),
    quantity: '',
  },
};

const showEmojiSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    changeFoodInfo: (state, action) => {
      state.food = action.payload;
    },
  },
});

const { reducer: changeFoodReducer } = showEmojiSlice;

export const { changeFoodInfo } = showEmojiSlice.actions;

export default changeFoodReducer;
