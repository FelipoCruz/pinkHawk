export interface IUser {
  firstName: string;
  familyName: string;
  email: string;
  twitterInfo: string;
  id: string;
  twitterAccountId: string;
  twitterName: string;
  twitterToken: string;
  twitterSecret: string;
  topics: string[];
  frequencyTweetPosting: number;
  profilePicture: string;
  postingHours?: number[];
}
