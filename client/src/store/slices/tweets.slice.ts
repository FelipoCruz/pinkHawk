import { createSlice } from '@reduxjs/toolkit';

interface Tweet {
  id: string;
  status: boolean;
  content: string;
}

interface TweetState {
  tweets: Tweet[];
};

const initialState: TweetState = {
  tweets: []
};

export const tweetSlice = createSlice({
  name: 'tweet',
  initialState,
  reducers: {
    selectionTweets: (state, action) => {
      state.tweets = action.payload;
      return state;
    },

    queueTweets: (state, action) => {
      const specificTweet = state.tweets.findIndex(tweet => tweet.id === action.payload.id);
      if (state.tweets[specificTweet].status === false) {
        state.tweets[specificTweet].status = true;
      }
      return state;
    },

    deleteTweet: (state, action) => {
      state.tweets.filter(tweet => tweet.id !== action.payload.id);
    },
  }
});

export const { selectionTweets, queueTweets, deleteTweet } = tweetSlice.actions;

export default tweetSlice.reducer;
