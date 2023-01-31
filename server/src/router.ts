import {
  createUser,
  getAllUsers,
  getUserById,
  signInUser,
} from './controller/user';
import { setTopics } from './controller/topic';
import { generateTweet } from './controller/tweet';
import {   getAccessToken, oauth } from './integration/twitter-api.service';


const router = require('express').Router();

/* USER MANAGEMENT */
router.post('/user/signup', createUser);
router.post('/user/signin', signInUser);

router.get('/user/:id', getUserById);
// router.get('/', getAllUsers)

/* TOPICS MANAGEMENT */
router.post('/topic/set-topics', setTopics);




router.post('/tweets/generate-tweet', generateTweet);


router.get('/oauth', oauth)
router.get('/callback', getAccessToken)

export default router;
