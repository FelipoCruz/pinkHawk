import { PrismaClient, Tweet } from '@prisma/client';
import { request, Request, response, Response } from "express";
import { TwitterApi } from "twitter-api-v2";
const prisma = new PrismaClient();
// interface TwitterApiTokens {
//   appKey: string;
//   appSecret: string;
//   accessToken?: string;
//   accessSecret?: string;
// }


//cron library to post tweets on schedule
var CronJob = require('cron').CronJob;
var job = new CronJob(
  '0 */01 * * * *', //seconds, minutes, hours, day of month, month, day of week
  async function () {
    const users = await prisma.user.findMany();
    for (let user of users) {
      //for every user, get his twitter access and all his queued tweets 
      const { twitterToken, twitterSecret, id } = user;
      const realUser = new TwitterApi({
        appKey: key,
        appSecret: secret!,
        accessToken: twitterToken!,
        accessSecret: twitterSecret!
      })

      await realUser.v2.tweet((await getOneQueuedTweet(id)).toString())
      console.log("hihi");
    }
  },
  null,
  false, //with this parameter set to true, no need to call job.start()
  'America/Los_Angeles'
);
// Use this if the 4th param is default value(false)
// job.start()

const getOneQueuedTweet = async (id: number) => {
  let currentIndex = 0;
  const tweets = await prisma.tweet.findMany({ where: { userId: id, status: "queued" } })

  let currentTweet = tweets[currentIndex]
  if (currentTweet) {
    await prisma.tweet.update({ where: { id: currentTweet.id }, data: { status: "posted" } })
  }
  currentIndex++
  console.log(currentTweet);

  return currentTweet.text;
}


const key = process.env.API_KEY || '';
const secret = process.env.API_KEY_SECRET || '';
let oauthToken = '';
let oauthSecret = '';
let userId = '';

export const oauth = async (req: Request, res: Response) => {
  const client = new TwitterApi({ appKey: key!, appSecret: secret! });
  userId = req.params.id;
  // generate auth link
  const authLink = await client.generateAuthLink(process.env.CALLBACK_URL, { linkMode: 'authorize' });
  const { url, oauth_token, oauth_token_secret } = authLink
  console.log(url, oauth_token, oauth_token_secret);
  oauthToken = oauth_token
  oauthSecret = oauth_token_secret
  res.send({ url: url, oauth_token: oauth_token, oauth_token_secret: oauth_token_secret })
}


export const getAccessToken = async (req: Request, res: Response) => {
  const { oauth_token, oauth_verifier } = req.query;
  // Get the saved oauth_token_secret
  const oauth_token_secret = oauthSecret

  if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
    return res.status(400).send('You denied the app or your session expired!');
  }

  // Obtain the persistent tokens
  // Create a client from temporary tokens;
  const client = new TwitterApi({
    appKey: key!,
    appSecret: secret!,
    accessToken: oauth_token.toString()!,
    accessSecret: oauth_token_secret!,
  })

  //then get client real accessTokens and accessSecret
  const { client: loggedClient, accessToken, accessSecret } = await client.login(oauth_verifier as string);

  //access this real user's data
  const realUser = new TwitterApi({
    appKey: key!,
    appSecret: secret!,
    accessToken: accessToken!,
    accessSecret: accessSecret!
  })
  const info = await realUser.v2.me();

  //save these user twitter data to database
  await prisma.user.update({
    where: { id: parseInt(userId) },
    data: {
      twitterToken: accessToken,
      twitterSecret: accessSecret,
      twitterInfo: info.data.username,
      twitterName: info.data.name,
      twitterAccountId: info.data.id
    }
  })

  res.redirect('http://localhost:3000/dashboard')
}




//tweet data:
// {
//   data: {
//     edit_history_tweet_ids: [ '1620442212197621762' ],
//     id: '1620442212197621762',
//     text: 'test'
//   }
// }

//User data
// {
//   data: {
//     id: '1618905953499332609',
//     name: 'IsNotSally',
//     username: 'IsNotSally'
//   }
// }