import { createSlice } from '@reduxjs/toolkit';

type keyType = { [key: string]: string | boolean };

export type spaceName =
  | 'space_1'
  | 'space_2'
  | 'space_3'
  | 'space_4'
  | 'space_5'
  | 'space_6'
  | 'space_7'
  | 'shoppingBag';

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

export interface ISearchedFood extends IFood {
  imgUrl: string;
}

const initialState: { newFood: IFood | ISearchedFood } = {
  newFood: {
    id: '',
    space: 'shoppingBag',
    type: '🥩 정육,수산',
    name: '',
    emoji: '1f34b',
    expiryDate: new Date().toISOString().substring(0, 10),
    quantity: '',
    bookmark: false,
  },
};

const newFoodSlice = createSlice({
  name: 'newFood',
  initialState,
  reducers: {
    changeNewFood: (state, action) => {
      state.newFood = action.payload;
    },
  },
});

const { reducer: changeNewFoodReducer } = newFoodSlice;

export const { changeNewFood } = newFoodSlice.actions;

export default changeNewFoodReducer;
