import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  // isLoggedIn: boolean;
  id: string;
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
}

const initialState: UserState = {
  // isLoggedIn: false,
  id: '',
  nickName: '',
  firstName: '',
  lastName: '',
  email: ''
};

// TODO: check if needed for async calls
// export const userAsync = createAsyncThunk(
//   'counter/fetchCount',
//   async (data: string) => {
//     const response = await fetchUser(data);
//     // The value we return becomes the `fulfilled` action payload
//     return response.data;
//   }
// );

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // to be used in the future if needed
    // isUserLogged: (state, action: PayloadAction<boolean>) => {
    //   state.isLoggedIn = action.payload;
    //   console.log('state', state)
    //   return state;
    // },

    activeUser: (state, action: PayloadAction<string>) => {
      state.id = action.payload;
      return state;
    }
  }
});

export const { activeUser } = userSlice.actions;

export default userSlice.reducer;
