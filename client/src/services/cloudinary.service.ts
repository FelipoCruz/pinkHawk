export const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/dnwteqila/';
const BASE_URL = 'http://localhost:5000/';

export const uploadImage = async (file: FormData) => {
  try {
    const url = `${CLOUDINARY_URL}image/upload`;
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
