const BASE_URL = process.env.REACT_APP_BASE_URL;
const CLOUDINARY = process.env.REACT_APP_CLOUDINARY_URL;
const CLOUDINARY_CLOUD = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;

console.log('both merged in the file', `${CLOUDINARY}${CLOUDINARY_CLOUD}`);

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

export const updateAvatar = async (userId: number, pictureLink: string) => {
  try {
    const url = `${BASE_URL}user/${userId}/profilePicture`;
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pictureLink }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
