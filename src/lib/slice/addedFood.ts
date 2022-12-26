import { createSlice } from '@reduxjs/toolkit';
import { IFood } from './foodSlice';

const initialState: { addedFood: IFood } = {
  addedFood: {
    id: '',
    space: 'shoppingBag',
    type: '',
    name: '',
    emoji: '1f34b',
    expiryDate: '',
    quantity: '',
    bookmark: false,
  },
};

const addedFoodSlice = createSlice({
  name: 'addedFood',
  initialState,
  reducers: {
    changeAddedFoodInfo: (state, action) => {
      state.addedFood = action.payload;
    },
  },
});

const { reducer: changeAddedFoodReducer } = addedFoodSlice;

export const { changeAddedFoodInfo } = addedFoodSlice.actions;

export default changeAddedFoodReducer;
