import { createSlice } from '@reduxjs/toolkit';
import { IFood } from 'src/lib/slice/foodSlice';

interface spaceState {
  [key: string]: IFood[];
}

interface freezerInner extends spaceState {
  space_1: IFood[];
  space_2: IFood[];
}

interface freezerDoor extends spaceState {
  space_3: IFood[];
  space_4: IFood[];
}

interface IShoppingBagFoods {
  freezer: {
    inner: freezerInner;
    door: freezerDoor;
  };
}

const initialState: IShoppingBagFoods = {
  freezer: {
    inner: {
      space_1: [],
      space_2: [],
    },
    door: {
      space_3: [],
      space_4: [],
    },
  },
};

const freezerFoodsSlice = createSlice({
  name: 'freezerFoods',
  initialState,
  reducers: {
    changeFreezerInner: (state, action) => {
      state.freezer.inner = action.payload;
    },
    changeFreezerDoor: (state, action) => {
      state.freezer.door = action.payload;
    },
  },
});

const { reducer: freezerFoodsReducer } = freezerFoodsSlice;

export const { changeFreezerInner, changeFreezerDoor } =
  freezerFoodsSlice.actions;

export default freezerFoodsReducer;