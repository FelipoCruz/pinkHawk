export interface UserState {
  isLoggedIn: boolean;
  id: string;
  name: string;
  username: string;
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  twitterInfo: string;
  twitterName: string;
  topics: string[];
  frequencyTweetPosting: number;
  profilePic?: string;
}