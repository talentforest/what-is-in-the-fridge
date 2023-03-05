import { configureStore } from '@reduxjs/toolkit';
import fridgeFoodsReducer from './slice/fridgeFoodsSlice';
import addToShoppingBagReducer from './slice/shoppingBagSlice';
import showEmojiBoxReducer from './slice/showEmojiBoxSlice';
import showModalReducer from './slice/showModalSlice';
import changeDoorReducer from './slice/doorOpenSlice';
import freezerFoodsReducer from './slice/freezerFoodsSlice';
import changeStoredFoodReducer from './slice/storedFoodSlice';
import changeKeywordReducer from './slice/keywordSlice';
import changeBookmarkReducer from './slice/bookmarkSlice';
import addFoodSectionReducer from './slice/showAddFoodSectionSlice';
import changeNewFoodReducer from './slice/newFoodSlice';
import changeTabBtnReducer from './slice/tabBtnSlice';

export const store = configureStore({
  reducer: {
    tabBtn: changeTabBtnReducer,
    bookmark: changeBookmarkReducer,
    keyword: changeKeywordReducer,
    addFoodSection: addFoodSectionReducer,
    doorOpen: changeDoorReducer,
    emojiBox: showEmojiBoxReducer,
    modal: showModalReducer,
    newFood: changeNewFoodReducer,
    shoppingBag: addToShoppingBagReducer,
    fridgeFoods: fridgeFoodsReducer,
    freezerFoods: freezerFoodsReducer,
    storedFood: changeStoredFoodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
