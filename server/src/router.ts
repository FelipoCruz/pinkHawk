import {
  createUser,
  getAllUsers,
  getUserById,
  signInUser,
  updateFrequency,
  signOutUser,
} from './controller/user';
import { setTopics } from './controller/topic';
import {
  fetchTweets,
  generateTweet,
  queueTweet,
  tweetDelete,
  tweetStatusPosted,
} from './controller/tweet';

import { getAccessToken, oauth } from './integration/twitter-api.service';
import { authProtect } from './middleware/auth-protect';

const router = require('express').Router();

/* USER MANAGEMENT */
router.post('/user/signup', createUser);
router.post('/user/signin', signInUser);
router.get('/user/signout', signOutUser);

router.get('/user/:id', authProtect, getUserById);
// router.get('/', getAllUsers)

/* TOPICS MANAGEMENT */
router.post('/topic/set-topics', authProtect, setTopics);
router.post('/tweets/generate-tweet', authProtect, generateTweet);

/* TWEETS MANAGEMENT */
//route to fetch tweets with status 'suggested' or 'queued'
router.get('/user/:id/tweets/:status', authProtect, fetchTweets);

// route to modify status of tweet from 'suggested' to 'queued'
router.put('/tweet/queueTweet', authProtect, queueTweet);

// route to modify status of tweets to 'posted'
router.put('/tweet/tweetStatusPosted', authProtect, tweetStatusPosted);

//route to modify the user posting frequency
router.put('/user/:id/frequency', authProtect, updateFrequency);

// route to delete tweet from DB
router.delete('/tweet/delete', authProtect, tweetDelete);

/* TWITTER REQUESTS MANAGEMENT? */
router.get('/user/:id/oauth', authProtect, oauth);
router.get('/callback', getAccessToken);

export default router;
