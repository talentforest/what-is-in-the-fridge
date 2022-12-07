import { configureStore } from '@reduxjs/toolkit';
import closeAddFoodAreaReducer from './slice/closeAddFoodAreaSlice';
import changeFoodReducer from './slice/foodSlice';
import showEmojiReducer from './slice/showEmojiSlice';
import showFoodModalReducer from './slice/showFoodModalSlice';
import showFreezerReducer from './slice/showFreezerSlice';

export const store = configureStore({
  reducer: {
    addFoodArea: closeAddFoodAreaReducer,
    freezer: showFreezerReducer,
    emoji: showEmojiReducer,
    food_modal: showFoodModalReducer,
    food: changeFoodReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
