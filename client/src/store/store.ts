import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import userReducer from './slices/user.slice';
import tweetReducer from './slices/tweet.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    tweets: tweetReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
