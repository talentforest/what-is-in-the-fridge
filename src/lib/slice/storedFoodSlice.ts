import { createSlice } from '@reduxjs/toolkit';
import { IFood } from './newFoodSlice';

const initialState: { storedFood: IFood } = {
  storedFood: {
    id: '',
    space: 'space_1',
    type: '🥩 정육,수산',
    name: '',
    emoji: '1f34b',
    expiryDate: '',
    quantity: '',
    bookmark: false,
  },
};

const storedFoodSlice = createSlice({
  name: 'storedFood',
  initialState,
  reducers: {
    changeStoredFood: (state, action) => {
      state.storedFood = action.payload;
    },
  },
});

const { reducer: changeStoredFoodReducer } = storedFoodSlice;

export const { changeStoredFood } = storedFoodSlice.actions;

export default changeStoredFoodReducer;
