import {
  createUser,
  getAllUsers,
  getUserById,
  signInUser,
  updateFrequency,
  signOutUser,
  updateAvatar,
  updateUserDetails,
} from './controller/user';
import { setTopics } from './controller/topic';
import {
  fetchTweets,
  generateTweet,
  queueTweet,
  tweetDelete,
  tweetStatusPosted,
  updateTweetText,
} from './controller/tweet';

import { authProtect } from './middleware/auth-protect';
import {
  getAccessToken,
  oauth,
} from './integration/twitter-service/twitter-auth';

const router = require('express').Router();

/* USER MANAGEMENT */
router.post('/user/signup', createUser);
router.post('/user/signin', signInUser);
router.get('/user/signout', signOutUser);

// route to modify the user details
router.put('/user/:id/', authProtect, updateUserDetails);

// route to get user by id
router.get('/user/:id', authProtect, getUserById);

/* TOPICS MANAGEMENT */
router.put('/user/:id/topics', authProtect, setTopics);
router.post('/tweets/generate-tweet', authProtect, generateTweet);

/* TWEETS MANAGEMENT */
// route to fetch tweets with status 'suggested' or 'queued'
router.get('/user/:id/tweets/:status', authProtect, fetchTweets);

// route to modify status of tweet from 'suggested' to 'queued'
router.put('/tweet/queueTweet', authProtect, queueTweet);

// route to modify status of tweets to 'posted'
router.put('/tweet/tweetStatusPosted', authProtect, tweetStatusPosted);

// route to modify the user posting frequency
router.put('/user/:id/frequency', authProtect, updateFrequency);

// route to modify the user profile picture
router.put('/user/:id/profilePicture', authProtect, updateAvatar);

// route to delete tweet from DB
router.delete('/tweet/delete', authProtect, tweetDelete);

// route to modify the tweet text
router.put('/tweet/:id', authProtect, updateTweetText);

/* TWITTER REQUESTS MANAGEMENT? */
router.get('/user/:id/oauth', authProtect, oauth);
router.get('/callback', getAccessToken);

export default router;

