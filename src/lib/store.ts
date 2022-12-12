import { configureStore } from '@reduxjs/toolkit';
import closeAddFoodAreaReducer from './slice/closeAddFoodAreaSlice';
import changeFoodReducer from './slice/foodSlice';
import fridgeFoodsReducer from './slice/fridgeFoodsSlice';
import addToShoppingBagReducer from './slice/shoppingBagSlice';
import showEmojiReducer from './slice/showEmojiSlice';
import showFoodModalReducer from './slice/showFoodModalSlice';
import changeModeReducer from './slice/freezerModeReducer';
import freezerFoodsReducer from './slice/freezerFoodsSlice';
import changeAddedFoodReducer from './slice/addedFood';
import showAddedFoodModalReducer from './slice/showAddedFoodModal';

export const store = configureStore({
  reducer: {
    addFoodArea: closeAddFoodAreaReducer,
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
