import { createSlice } from '@reduxjs/toolkit';

interface IFoodData {
  item: {
    allergy: string;
    barcode: string;
    capacity: string;
    imgurl1: string;
    imgurl2: string;
    manufacture: string;
    nutrient: string;
    prdkind: string;
    prdkindstate: string;
    prdlstNm: string;
    prdlstReportNo: string;
    productGb: string;
    rawmtrl: string;
    rnum: string;
    seller: string;
  };
}

interface IDataProps {
  body: {
    items: IFoodData[];
    numOfRows: string;
    pageNo: string;
    totalCount: string;
  };
}

const initialState: IDataProps = {
  body: {
    items: [],
    numOfRows: '',
    pageNo: '',
    totalCount: '',
  },
};

const searchFoodSlice = createSlice({
  name: 'searchFood',
  initialState,
  reducers: {
    searchFood: (state, action) => {
      state.body = action.payload;
    },
  },
});

const { reducer: searchFoodReducer } = searchFoodSlice;

export const { searchFood } = searchFoodSlice.actions;

export default searchFoodReducer;
