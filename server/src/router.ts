import {
  createUser,
  getAllUsers,
  getUserById,
  signInUser,
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
import express, { Request, Response } from 'express';
import {
  getAccessToken,
  oauth,
  postTweet,
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

// route to delete tweet from DB
router.delete('/tweet/delete', tweetDelete);

/* TWITTER REQUESTS MANAGEMENT? */
router.get('/oauth', oauth);
router.get('/user/:id/oauth', oauth);
router.get('/callback', getAccessToken);

//to post tweets on behalf of the user
router.post('user/:id/postTweets', postTweet);
export default router;
