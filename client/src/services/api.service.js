// import Axios from 'axios';

const BASE_URL = 'http://localhost:5000/';

export const register = async (firstname, lastname, email, password) => {
  try {
    const url = BASE_URL + 'user/signup';
    const response = await fetch(url, {
      method: 'POST',
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

export const logout = async () => {
  try {
    const url = BASE_URL + 'user/signout';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};

export const saveTopics = async (topics, userEmail) => {
  try {
    const url = BASE_URL + 'topic/set-topics';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ topics, userEmail }),
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
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
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
    const res = await fetch(`${BASE_URL}user/${id}/oauth`);
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateTimeFrequencyPreference = async (id, frequency) => {
  try {
    const res = await fetch(`${BASE_URL}user/${id}/frequency/${frequency}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ frequency }),
    })
    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const updateHourFrequencyPreference = async (id, hour) => {
  try {
    const res = await fetch(`${BASE_URL}user/${id}/hour/${hour}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hour }),
    })
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
