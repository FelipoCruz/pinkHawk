const BASE_URL = 'http://localhost:5000/';

export const queueTweetDB = async (userId, tweetId) => {
  try {
    const url = BASE_URL + 'tweet/queueTweet';
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id: userId,
        tweetId: tweetId
      }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};