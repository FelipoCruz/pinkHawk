import { createSlice } from '@reduxjs/toolkit';
import IUser from '../../app/interfaces/user.interface';

const initialState: IUser = {
  isLoggedIn: false,
  id: '',
  name: '',
  username: '',
  nickName: '',
  firstName: '',
  lastName: '',
  email: '',
  twitterInfo: '',
  twitterName: '',
  topics: [],
  frequencyTweetPosting: 0,
  profilePicture: '',
  postingHours: [],
  twitterToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    activeUser: (state, action) => {
      state.isLoggedIn = true;
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.username = action.payload.username;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.familyName;
      state.email = action.payload.email;
      state.twitterInfo = action.payload.twitterInfo;
      state.twitterName = action.payload.twitterName;
      state.topics = action.payload.topics;
      state.frequencyTweetPosting = action.payload.frequencyTweetPosting;
      state.profilePicture = action.payload.profilePicture;
      state.postingHours = action.payload.postingHours;
      state.twitterToken = action.payload.twitterToken;
    },

    deactivateUser: (state) => {
      state.isLoggedIn = false;
      state.id = '';
      state.name = '';
      state.username = '';
      state.firstName = '';
      state.lastName = '';
      state.email = '';
      state.twitterInfo = '';
      state.twitterName = '';
      state.topics = [];
      state.frequencyTweetPosting = 0;
      state.profilePicture = '';
      state.postingHours = [];
      state.twitterToken = '';
    },
  },
});

export const { activeUser, deactivateUser } = userSlice.actions;

export default userSlice.reducer;
