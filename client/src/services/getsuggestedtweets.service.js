const BASE_URL = 'http://localhost:5000/';

export const getSuggestedTweets = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}user/${userId}/tweets/suggested`);
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};