import { fetchWrapper } from './fetch-wrapper.js';

const envTest = process.env.TEST;
console.log('envTest is: ', envTest);

console.log('Server url', process.env.REACT_APP_SERVER_URL);

const BASE_URL = process.env.REACT_APP_SERVER_URL;
console.log('server and / base url is: ' + BASE_URL);

export const register = async (firstname, lastname, email, password) => {
  try {
    const response = await fetchWrapper('POST', `${BASE_URL}user/signup`, {
      firstName: firstname,
      familyName: lastname,
      email,
      password,
      twitterInfo: '',
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const login = async (email, password) => {
  // try {
  //   const response = await fetchWrapper('POST', `${BASE_URL}user/signin`, {
  //     email,
  //     password,
  //   });
  //   return response.json();
  // } catch (err) {
  //   console.log(err);
  // }
  try {
    const url = BASE_URL + 'user/signin';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const logout = async (id) => {
  try {
    const response = await fetchWrapper('GET', `${BASE_URL}user/${id}/signout`);
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const saveTopics = async (topics, userId) => {
  try {
    const response = await fetchWrapper(
      'PUT',
      `${BASE_URL}user/${userId}/topics`,
      { topics }
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const generateTweetServiceClient = async (user) => {
  try {
    const response = await fetchWrapper(
      'POST',
      `${BASE_URL}tweets/generate-tweet`,
      user
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await fetchWrapper('GET', `${BASE_URL}user/${id}`);
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getAuthUrl = async (id) => {
  try {
    const response = await fetchWrapper('GET', `${BASE_URL}user/${id}/oauth`);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateFrequencyPreference = async (
  id,
  frequency,
  postingHours
) => {
  try {
    const res = await fetchWrapper('PUT', `${BASE_URL}user/${id}/frequency`, {
      frequency,
      postingHours,
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserTweets = async (id, status) => {
  try {
    const response = await fetchWrapper(
      'GET',
      `${BASE_URL}user/${id}/tweets/${status}`
    );
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const deleteTweetDB = async (userId, tweetId) => {
  try {
    const response = await fetchWrapper('DELETE', `${BASE_URL}tweet/delete`, {
      Id: userId,
      tweetId: tweetId,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const addTweetToQueue = async (userId, tweetId, nextPostingTime) => {
  try {
    const response = await fetchWrapper(
      'PUT',
      `${BASE_URL}user/${userId}/tweet/${tweetId}`,
      {
        status: 'queued',
        nextPostingTime,
      }
    );
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const queueTweetDB = async (userId, tweetId, postingDate) => {
  try {
    const response = await fetchWrapper('PUT', `${BASE_URL}tweet/queueTweet`, {
      Id: userId,
      tweetId: tweetId,
      postingTimestamp: postingDate,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateText = async (id, text) => {
  try {
    const response = await fetchWrapper('PUT', `${BASE_URL}tweet/${id}`, text);
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateUserDetails = async (userId, details) => {
  try {
    const response = await fetchWrapper('PUT', `${BASE_URL}user/${userId}`, {
      currentPassword: details.currentPassword,
      passwordOne: details.passwordOne,
      passwordTwo: details.passwordTwo,
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getMostRecentQueuedTweet = async (userId) => {
  try {
    const response = await fetchWrapper(
      'GET',
      `${BASE_URL}user/${userId}/next-recent-queued-tweet`
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getGrowth = async (userId) => {
  try {
    const response = await fetchWrapper(
      'GET',
      `${BASE_URL}user/${userId}/growth`
    );
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
