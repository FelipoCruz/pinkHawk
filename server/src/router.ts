import { createUser, getAllUsers } from "./controller/user";

const router = require('express').Router();


router.post('/user/signup', createUser);
router.get('/', getAllUsers)






export default router;