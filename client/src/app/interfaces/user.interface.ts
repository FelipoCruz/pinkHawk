export default interface IUser {
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
  postingHours: number[];
  frequencyTweetPosting: number;
  profilePic?: string;
}
