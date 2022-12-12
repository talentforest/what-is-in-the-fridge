import { createSlice } from '@reduxjs/toolkit';
import { changeStrDate } from 'src/utils/changeStrDate';
import { IFood } from './foodSlice';

const initialState = {
  addedFood: {
    space: 'shoppingBag',
    type: '',
    name: '',
    emoji: '1f34b',
    expiryDate: changeStrDate(new Date()),
    quantity: '',
  } as IFood,
};

const addedFoodSlice = createSlice({
  name: 'addedFood',
  initialState,
  reducers: {
    changeAddedFoodInfo: (state, action) => {
      state.addedFood = action.payload;
    },
    removeAddedFood: (state, action) => {
      state.addedFood = action.payload;
    },
  },
});

const { reducer: changeAddedFoodReducer } = addedFoodSlice;

export const { changeAddedFoodInfo } = addedFoodSlice.actions;

export default changeAddedFoodReducer;
