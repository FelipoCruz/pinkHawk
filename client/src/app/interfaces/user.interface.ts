export default interface IUser {
  isLoggedIn: boolean;
  id: string;
  name: string;
  username: string;
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  twitterInfo: string;
  twitterName: string;
  topics: string[];
  frequencyTweetPosting: number;
  twitterToken: string;
  profilePicture?: string;
  postingHours: number[];
};

export interface ProfilePictureProps {
  image: string;
  imageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  setRawImage: React.Dispatch<React.SetStateAction<File | null>>;
  rawImage: File | null;
  setImageURL: React.Dispatch<React.SetStateAction<string>>;
  imageURL: string;
  // onClick: React.MouseEventHandler<HTMLButtonElement>;
  changeSubmit: () => void;
};
