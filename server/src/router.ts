
import { createUser, getAllUsers, signInUser } from "./controller/user";
import { tweet } from "./twitter";

const router = require('express').Router();


router.post('/user/signup', createUser);
router.post('/user/signin', signInUser);


router.get('/', getAllUsers)

router.post('/2/tweets', tweet)


export default router;