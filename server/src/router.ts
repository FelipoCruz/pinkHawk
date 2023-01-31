import {
  createUser,
  getAllUsers,
  getUserById,
  signInUser,
} from './controller/user';
import { setTopics } from './controller/topic';
import { fetchQueuedTweets, fetchSuggestedTweets, generateTweet } from './controller/tweet';
import express, { Request, Response } from 'express';

const router = require('express').Router();

/* USER MANAGEMENT */
router.post('/user/signup', createUser);
router.post('/user/signin', signInUser);

router.get('/user/:id', getUserById);
// router.get('/', getAllUsers)

/* TOPICS MANAGEMENT */
router.post('/topic/set-topics', setTopics);

/* TWEETS MANAGEMENT */
router.post('/tweets/generate-tweet', generateTweet);

/* router.get('/tweets/suggested', fetchSuggestedTweets)
router.get('/tweets/queued', fetchQueuedTweets); */

router.get('/tweets/:status', function(req: Request , res: Response) {
  const status = req.params.status;
  if (status === 'selection') querySuggestedTweets;
  if (status === 'queued') queryQueuedTweets;
})

export default router;
