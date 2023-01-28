import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import userReducer from './slices/user.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
