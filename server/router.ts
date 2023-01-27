import { updatePost } from "./controller/posts";
import { getUser } from "./controller/user";

const router = require('express').Router();

router.get('/', getUser);
router.put('/post/:id', updatePost)




module.exports = router;