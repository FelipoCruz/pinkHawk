import { createUser, getAllUsers, signInUser } from "./controller/user";
import { setTopics } from "./controller/topic";
import { generateTweet } from "./controller/tweet";

const router = require('express').Router();

/* USER MANAGEMENT */
router.post('/user/signup', createUser);
router.post('/user/signin', signInUser);
// router.get('/', getAllUsers)



/* TOPICS MANAGEMENT */
router.post('/topic/set-topics', setTopics);



/* TWEETS MANAGEMENT */
router.post('/tweets/generate-tweet', generateTweet);


export default router;