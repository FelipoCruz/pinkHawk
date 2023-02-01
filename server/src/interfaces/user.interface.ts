export interface IUser {
  isLoggedIn: boolean;
  id: string;
  name: string;
  username: string;
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  topics: string[];
  frequencyTweetPosting: number;
  profilePic?: string;
}
