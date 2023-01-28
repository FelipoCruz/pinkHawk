import { createUser, getAllUsers, signInUser } from "./controller/user";

const router = require('express').Router();


router.post('/user/signup', createUser);
router.post('/user/signin', signInUser);


router.get('/', getAllUsers)






export default router;