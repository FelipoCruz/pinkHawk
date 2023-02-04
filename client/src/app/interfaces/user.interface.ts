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
  frequencyTweetPosting: number;
  twitterToken: string;
  profilePic?: string;
  postingHours: number[];
};

export interface ProfilePictureProps {
  image: string;
  imageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
