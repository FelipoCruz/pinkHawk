import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: String,
  nickName: String,
  firstName: String,
  lastName: String,
  email: String
};

const activeSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    activeUser: (state, action) => {
      state = { ...action.payload };
      return state;
    }
  }
});

export const { activeUser } = activeSlice.actions;

export default activeSlice.reducer;
