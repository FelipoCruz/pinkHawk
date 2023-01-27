const db = require('../models/index.js')

const getTweets = async (req, res) => {
  try {
    const tweets = await db.tweet.findAll();
    console.log('tasks are ')
    console.log(tweets)
    res.status(200)
    res.send(tweets)
  } catch (error) {
    console.log('Error in getTasks', error)
    res.status(500)
  }
};

const addTweet = async (req, res) => {
  try {
    const newTweet = req.body
    await db.tweet.create(newTweet);
    res.status(201);
    res.send(newTweet);
  } catch (error) {
    console.log('Error in addTask', error)
    res.status(500)
  }
}

module.exports = { getTweets, addTweet }

