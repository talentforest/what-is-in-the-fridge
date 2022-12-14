import { createSlice } from '@reduxjs/toolkit';

export type spaceName =
  | 'space_1'
  | 'space_2'
  | 'space_3'
  | 'space_4'
  | 'space_5'
  | 'space_6'
  | 'space_7'
  | 'shoppingBag';

type keyType = { [key: string]: string | spaceName | boolean };

export interface IFood extends keyType {
  id: string;
  space: spaceName;
  type: string;
  name: string;
  emoji: string;
  expiryDate: string;
  quantity: string;
  bookmark: boolean;
}

export interface ISearchedFood extends IFood, keyType {
  imgUrl: string;
}

const initialState: { food: IFood | ISearchedFood } = {
  food: {
    id: '',
    space: 'shoppingBag',
    type: '🥩 정육,수산',
    name: '',
    emoji: '1f34b',
    expiryDate: '2022-12-25',
    quantity: '',
    bookmark: false,
  },
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    changeFoodInfo: (state, action) => {
      state.food = action.payload;
    },
  },
});

const { reducer: changeFoodReducer } = foodSlice;

export const { changeFoodInfo } = foodSlice.actions;

export default changeFoodReducer;
