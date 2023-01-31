import { Request, Response } from "express";
import { TwitterApi } from "twitter-api-v2";
interface TwitterApiTokens {
  appKey: string;
  appSecret: string;
  accessToken?: string;
  accessSecret?: string;
}

const key = process.env.API_KEY || '';
const secret = process.env.API_KEY_SECRET

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

  
  //then create a real client
  const realUser = new TwitterApi({
    appKey: key!,
    appSecret: secret!,
    accessToken: accessToken!,
    accessSecret: accessSecret!
  })

  const sally = await realUser.v2.tweet('test3')
  console.log(sally);

  res.redirect('http://localhost:3000')
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