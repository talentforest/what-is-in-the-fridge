import { createSlice } from '@reduxjs/toolkit';
import { IFood } from 'src/lib/slice/foodSlice';

interface IShoppingBagFoods {
  shoppingBagFoods: IFood[];
}

const initialState: IShoppingBagFoods = {
  shoppingBagFoods: [],
};

const shoppingBagSlice = createSlice({
  name: 'shoppingBagFoods',
  initialState,
  reducers: {
    addToShoppingBag: (state, action) => {
      state.shoppingBagFoods = action.payload;
    },
    removeShoppingBagFood: (state, action) => {
      state.shoppingBagFoods = state.shoppingBagFoods.filter(
        (item) => item.id !== action.payload.id
      );
    },
  },
});

const { reducer: addToShoppingBagReducer } = shoppingBagSlice;

export const { addToShoppingBag, removeShoppingBagFood } =
  shoppingBagSlice.actions;

export default addToShoppingBagReducer;
