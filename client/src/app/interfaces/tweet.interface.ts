export interface Tweet {
  id: number;
  status: string;
  text: string;
}

export interface TweetState {
  tweets: Tweet[]
};