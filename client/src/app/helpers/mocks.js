import { v4 as uuidv4 } from 'uuid';

const idOne = uuidv4();
const idTwo = uuidv4();
const idThree = uuidv4();
const idFour = uuidv4();

let tweets = {
  [idOne]: {
    id: '1',
    status: 'selection',
    content: 'lorem ipsum'
  },
  [idTwo]: {
    id: '2',
    status: 'selection',
    content: 'lorem ipsum'
  },
  [idThree]: {
    id: '3',
    status: 'queue',
    content: 'lorem ipsum'
  },
  [idFour]: {
    id: '4',
    status: 'queue',
    content: 'lorem ipsum'
  }
};

// GET TWEETS
export const getTweets = () =>
  new Promise((resolve, reject) => {
    if (!tweets) {
      return setTimeout(
        () => reject(new Error('Tweets not found')),
        250
      );
    }
    setTimeout(() => resolve(Object.values(tweets)), 250);
  });

const doGetTweets = async () => {
  try {
    const result = await getTweets();
    console.log(result);
  } catch (err) {
    console.log(err);
  }
};

doGetTweets();

// GET TWEET
export const getTweet = (id) =>
  new Promise((resolve, reject) => {
    const tweet = tweets[id];

    if (!tweet) {
      return setTimeout(
        () => reject(new Error('Tweet not found')),
        250
      );
    }
    setTimeout(() => resolve(tweets[id]), 250);
  });

const doGetTweet = async (id) => {
  try {
    const result = await getTweet(id);
    console.log('result get: ', result);
  } catch (err) {
    console.log(err);
  }
};

doGetTweet('1');

// // CREATE
// const createTweet = (data) =>
//   new Promise((resolve, reject) => {
//     if (!data.status || !data.content) {
//       reject(new Error('Not all information provided'));
//     }

//     const id = uuidv4();
//     const newTweet = { id, ...data };

//     tweets = { ...tweets, [id]: newTweet };

//     setTimeout(() => resolve(true), 250);
//   });

// const doCreateTweet = async (data) => {
//   try {
//     const result = await createTweet(data);
//     console.log('result create: ', result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// doCreateTweet({ status: 'selection', content: 'lorem ipum 5' });

// DELETE
export const deleteTweet = (id) =>
  new Promise((resolve, reject) => {
    const { [id]: tweet, ...rest } = tweets;

    if (!tweet) {
      return setTimeout(
        () => reject(new Error('Tweet not found')),
        250
      );
    }
    tweets = { ...rest };
    return setTimeout(() => resolve(true), 250);
  });

// usage
const doDeleteTweet = async (id) => {
  try {
    const result = await deleteTweet(id);
    console.log('result delete: ', result);
  } catch (err) {
    console.log(err);
  }
};

doDeleteTweet('1');
