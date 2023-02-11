// import Axios from 'axios';

/* import dotenv from 'dotenv';

dotenv.config(); */

const envTest = process.env.REACT_APP_BASE_URL;
console.log('envTest is: ', envTest);

const BASE_URL = process.env.REACT_APP_BASE_URL;
console.log('server / base url is: ' + BASE_URL);

export const register = async (firstname, lastname, email, password) => {
  try {
    const url = BASE_URL + 'user/signup';
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstname,
        familyName: lastname,
        email,
        password,
        twitterInfo: '',
      }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const login = async (email, password) => {
  try {
    const url = BASE_URL + 'user/signin';
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
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
    const url = BASE_URL + `user/${id}/signout`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const saveTopics = async (topics, userId) => {
  try {
    const url = `${BASE_URL}user/${userId}/topics`;
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topics }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const generateTweetServiceClient = async (user) => {
  try {
    const url = BASE_URL + 'tweets/generate-tweet';
    const response = await fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    console.log(response);
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (id) => {
  try {
    const url = BASE_URL + 'user/' + id;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getAuthUrl = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}user/${id}/oauth`, {
      method: 'GET',
      credentials: 'include',
    });
    console.log('res.body is: ', res.body);
    return res.json();
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
    const res = await fetch(`${BASE_URL}user/${id}/frequency`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ frequency, postingHours }),
    });
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const getUserTweets = async (id, status) => {
  try {
    const response = await fetch(`${BASE_URL}user/${id}/tweets/${status}`, {
      method: 'GET',
      credentials: 'include',
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const deleteTweetDB = async (userId, tweetId) => {
  try {
    const url = BASE_URL + 'tweet/delete';
    const response = await fetch(url, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id: userId,
        tweetId: tweetId,
      }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const addTweetToQueue = async (userId, tweetId) => {
  try {
    const response = await fetch(`${BASE_URL}user/${userId}/tweet/${tweetId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: 'queued',
      }),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
  }
};

export const queueTweetDB = async (userId, tweetId, postingDate) => {
  console.log('postingDate is module queueTweetDB is: ', postingDate);
  console.log(
    'postingDate is module queueTweetDB type is: ',
    typeof postingDate
  );
  try {
    const url = BASE_URL + 'tweet/queueTweet';
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Id: userId,
        tweetId: tweetId,
        postingTimestamp: postingDate,
      }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateText = async (id, text) => {
  try {
    const url = `${BASE_URL}tweet/${id}`;
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const updateUserDetails = async (userId, details) => {
  try {
    const url = `${BASE_URL}user/${userId}`;
    const response = await fetch(url, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentPassword: details.currentPassword,
        passwordOne: details.passwordOne,
        passwordTwo: details.passwordTwo
      }),
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const getNextPostingTime = async (userId) => {
  try {
    const url = `${BASE_URL}user/${userId}/next-posting-time`;
    const response = await fetch(url, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
