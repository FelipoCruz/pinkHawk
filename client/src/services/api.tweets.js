const BASE_URL = 'http://localhost:5000/';

export const getSelectionTweets = async () => {
  try {
    const response = await fetch(`${BASE_URL}/getTweets`);
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

