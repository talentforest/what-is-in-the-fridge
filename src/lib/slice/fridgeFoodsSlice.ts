import { createSlice } from '@reduxjs/toolkit';
import { IFood } from 'src/lib/slice/foodSlice';

type spaceType = { [key: string]: IFood[] };
type keyType = {
  [key: string]: fridgeInner | fridgeDoor;
};
type key = {
  [key: string]: FridgeSide;
};

interface fridgeInner extends spaceType {
  space_1: IFood[];
  space_2: IFood[];
  space_3: IFood[];
  space_4: IFood[];
}

interface fridgeDoor extends spaceType {
  space_5: IFood[];
  space_6: IFood[];
  space_7: IFood[];
}

interface FridgeSide extends keyType {
  inner: fridgeInner;
  door: fridgeDoor;
}

interface IShoppingBagFoods extends key {
  fridge: FridgeSide;
}

const initialState: IShoppingBagFoods = {
  fridge: {
    inner: {
      space_1: [
        {
          id: 'fridge_example',
          space: 'space_1',
          name: '삼겹살',
          type: '🥩 정육,수산',
          emoji: '1f969',
          expiryDate: '2022-12-09',
          quantity: '1',
          bookmark: false,
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
    changeFridgeInner: (state, action) => {
      state.fridge.inner = action.payload;
    },
    changeFridgeDoor: (state, action) => {
      state.fridge.door = action.payload;
    },
  },
});

const { reducer: fridgeFoodsReducer } = fridgeFoodsSlice;

export const { changeFridgeInner, changeFridgeDoor } = fridgeFoodsSlice.actions;

export default fridgeFoodsReducer;
