import { createSlice } from '@reduxjs/toolkit';
import { IFood } from 'src/components/template/AddFoodSection';

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
        (item) => item.name !== action.payload.name
      );
    },
  },
});

const { reducer: addToShoppingBagReducer } = shoppingBagSlice;

export const { addToShoppingBag, removeShoppingBagFood } =
  shoppingBagSlice.actions;

export default addToShoppingBagReducer;
