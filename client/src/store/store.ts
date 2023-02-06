import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import userReducer from './slices/user.slice';
import layoutReducer from './slices/layout.slice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    layout: layoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
