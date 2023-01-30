import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  loading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    isUserLogged: (state, action) => {
      state = { ...action.payload, isLoggedIn: true };
      console.log('state', state);
      return state;
    },

    logout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { isUserLogged, logout } = authSlice.actions;

export default authSlice.reducer;
