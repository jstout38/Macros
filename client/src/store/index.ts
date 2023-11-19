import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { authApi } from './apis/authApi';
import { foodApi } from './apis/foodApi';
import { journalApi } from './apis/journalApi';
import macroReducer from './slices/macroSlice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [foodApi.reducerPath]: foodApi.reducer,
    [journalApi.reducerPath]: journalApi.reducer,
    macros: macroReducer,
  },
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(foodApi.middleware)
      .concat(journalApi.middleware)
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export { useFetchUserQuery, useAddUserMutation } from './apis/authApi';
export { useFetchFoodQuery, useAddFoodMutation, useFetchUserFoodQuery, useDeleteFoodMutation, useEditFoodMutation } from './apis/foodApi';
export { useAddJournalMutation, useUpdateJournalMutation, useFetchJournalQuery, useDeleteEntryMutation } from './apis/journalApi';