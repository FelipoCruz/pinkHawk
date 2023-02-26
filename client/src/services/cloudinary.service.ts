import { fetchWrapper } from './fetch-wrapper';

const BASE_URL = process.env.SERVER_URL;
const CLOUDINARY = process.env.REACT_APP_CLOUDINARY_URL;
const CLOUDINARY_CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

export const uploadImage = async (file: FormData) => {
  try {
    const url = `${CLOUDINARY}${CLOUDINARY_CLOUD}/image/upload`;
    const response = await fetch(url, {
      method: 'POST',
      body: file,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateAvatar = async (userId: string, pictureLink: string) => {
  console.log('picture link in api call', pictureLink);
  console.log('type of picture link in api call', typeof pictureLink);
  try {
    const url = `${BASE_URL}user/${userId}/profilePicture`;
    const response = await fetchWrapper('PUT', url, { pictureLink });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
