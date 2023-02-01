import { createSlice } from '@reduxjs/toolkit';
import { TweetState } from '../../app/interfaces/tweet.interface';

const initialState: TweetState = {
  tweets: [],
};

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    suggestedTweets: (state, action) => {
      return action.payload;
    },

    queueTweets: (state, action) => {
      const specificTweet = state.tweets.findIndex(tweet => tweet.id === action.payload.id);
      console.log(state.tweets[specificTweet]);
      if (state.tweets[specificTweet].status === 'selection') {
        state.tweets[specificTweet].status = 'queue';
      }
      return state;
    },

    deleteTweet: (state, action) => {
      state.tweets.filter(tweet => tweet.id !== action.payload.id);
    },
  }
});

export const { suggestedTweets, queueTweets, deleteTweet } = tweetSlice.actions;

export default tweetSlice.reducer;
