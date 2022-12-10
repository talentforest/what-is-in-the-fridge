import { createSlice } from '@reduxjs/toolkit';
import { IFood } from 'src/components/template/AddFoodSection';

interface spaceState {
  [key: string]: IFood[];
}

interface fridgeInner extends spaceState {
  space_1: IFood[];
  space_2: IFood[];
  space_3: IFood[];
  space_4: IFood[];
}

interface fridgeDoor extends spaceState {
  space_5: IFood[];
  space_6: IFood[];
  space_7: IFood[];
}

interface IShoppingBagFoods {
  fridge: {
    inner: fridgeInner;
    door: fridgeDoor;
  };
}

const initialState: IShoppingBagFoods = {
  fridge: {
    inner: {
      space_1: [
        {
          id: 1,
          spaceType: 'space_1',
          name: '1',
          type: '정육,수산',
          emoji: '1f969',
          expiryDate: '2022-12-09',
          quantity: '1',
        },
      ],
      space_2: [],
      space_3: [],
      space_4: [],
    },
    door: {
      space_5: [],
      space_6: [],
      space_7: [],
    },
  },
};

const fridgeFoodsSlice = createSlice({
  name: 'fridgeFoods',
  initialState,
  reducers: {
    changeInnerFoods: (state, action) => {
      state.fridge.inner = action.payload;
    },
    changeDoorFoods: (state, action) => {
      state.fridge.door = action.payload;
    },
  },
});

const { reducer: fridgeFoodsReducer } = fridgeFoodsSlice;

export const { changeInnerFoods, changeDoorFoods } = fridgeFoodsSlice.actions;

export default fridgeFoodsReducer;
