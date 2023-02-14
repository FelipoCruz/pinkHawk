export interface IUser {
  firstName: string;
  familyName: string;
  email: string;
  twitterInfo: string | null;
  id: number;
  twitterAccountId: string | null;
  twitterName: string | null;
  twitterToken: string | null;
  twitterSecret: string | null;
  topics: string[];
  frequencyTweetPosting: number | null;
  profilePicture: string | null;
  postingHours?: number[];
  jwtToken?: string;
  password?: string;
}
