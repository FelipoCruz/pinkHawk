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

import {
  getAccessToken,
  oauth,
} from './integration/twitter-api.service';

const router = require('express').Router();

/* USER MANAGEMENT */
router.post('/user/signup', createUser);
router.post('/user/signin', signInUser);
router.get('/user/signout', signOutUser);

router.get('/user/:id', getUserById);
// router.get('/', getAllUsers)

/* TOPICS MANAGEMENT */
router.post('/topic/set-topics', setTopics);
router.post('/tweets/generate-tweet', generateTweet);

/* TWEETS MANAGEMENT */
//route to fetch tweets with status 'suggested' or 'queued'
router.get('/user/:id/tweets/:status', fetchTweets);

// route to modify status of tweet from 'suggested' to 'queued'
router.put('/tweet/queueTweet', queueTweet);

// route to modify status of tweets to 'posted'
router.put('/tweet/tweetStatusPosted', tweetStatusPosted);

//route to modify the user posting frequency
router.put('/user/:id/frequency', updateFrequency)

// route to delete tweet from DB
router.delete('/tweet/delete', tweetDelete);

/* TWITTER REQUESTS MANAGEMENT? */
router.get('/oauth', oauth);
router.get('/user/:id/oauth', oauth);
router.get('/callback', getAccessToken);

export default router;
