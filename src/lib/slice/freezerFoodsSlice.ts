import { createSlice } from '@reduxjs/toolkit';
import { IFood } from './newFoodSlice';

type spaceType = { [key: string]: IFood[] };
type keyType = {
  [key: string]: freezerInner | freezerDoor;
};

interface freezerInner extends spaceType {
  space_1: IFood[];
  space_2: IFood[];
}

interface freezerDoor extends spaceType {
  space_3: IFood[];
  space_4: IFood[];
}

interface FreezerSide extends keyType {
  inner: freezerInner;
  door: freezerDoor;
}

export interface IFreezerFoods {
  freezer: FreezerSide;
}

const initialState: IFreezerFoods = {
  freezer: {
    inner: {
      space_1: [
        {
          id: 'freezer_example',
          space: 'space_1',
          name: '냉동 삼겹살',
          type: '🥩 정육,수산',
          emoji: '1f969',
          expiryDate: '2022-12-09',
          quantity: '1',
          bookmark: false,
        },
      ],
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
