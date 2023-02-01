const BASE_URL = 'http://localhost:5000/';

export const getUserTweets = async (id, status) => {
  try {
    const response = await fetch(`${BASE_URL}user/${id}/tweets/${status}`);
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

