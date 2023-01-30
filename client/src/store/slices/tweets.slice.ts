import { createSlice } from '@reduxjs/toolkit';

interface TweetState {
  id: string;
  status: boolean;
  content: string;
}

const initialState: TweetState = {
  id: '',
  status: false,
  content: ''
};

export const tweetSlice = createSlice({
  name: 'tweets',
  initialState,
  reducers: {
    selectionTweets: (state, action) => {
      state = action.payload;
      return state;
    },

    queueTweets: (state, action) => {
      const specificTweet = state.findIndex(tweet => tweet.id === action.payload.id);
      if (specificTweet.status === false) {
        specificTweet.status = true;
      }
      return state;
    },

    deleteTweet: (state, action) => {
      return state.filter(tweet => tweet.id !== action.payload.id);
    },
  },
});

export const { selectionTweets, queueTweets, deleteTweet } = tweetSlice.actions;

export default tweetSlice.reducer;