import { configureStore } from '@reduxjs/toolkit';
import changeFoodReducer from './slice/foodSlice';
import fridgeFoodsReducer from './slice/fridgeFoodsSlice';
import addToShoppingBagReducer from './slice/shoppingBagSlice';
import showEmojiReducer from './slice/openCloseState/showEmojiSlice';
import showFoodModalReducer from './slice/openCloseState/showFoodModalSlice';
import changeModeReducer from './slice/freezerModeReducer';
import freezerFoodsReducer from './slice/freezerFoodsSlice';
import changeAddedFoodReducer from './slice/addedFood';
import showAddedFoodModalReducer from './slice/openCloseState/showAddedFoodModal';
import addFoodAreaReducer from './slice/openCloseState/addFoodAreaSlice';
import changeKeywordReducer from './slice/keywordSlice';
import changeBookmarkReducer from './slice/bookmarkSlice';

export const store = configureStore({
  reducer: {
    bookmark: changeBookmarkReducer,
    keyword: changeKeywordReducer,
    addFoodArea: addFoodAreaReducer,
    freezerMode: changeModeReducer,
    emoji: showEmojiReducer,
    foodModal: showFoodModalReducer,
    food: changeFoodReducer,
    shoppingBag: addToShoppingBagReducer,
    fridgeFoods: fridgeFoodsReducer,
    freezerFoods: freezerFoodsReducer,
    addedFood: changeAddedFoodReducer,
    addedFoodModal: showAddedFoodModalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
