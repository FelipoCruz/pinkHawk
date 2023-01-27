const express = require('express');
const {
  getTweets,
  addTweet
} = require('../controllers/controller')

const router = express.Router();

router.get('/tweets/get', getTweets);
router.post('/tweets/post', addTweet);

module.exports = router;
