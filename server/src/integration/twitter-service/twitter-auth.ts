import { PrismaClient, Tweet } from '@prisma/client';
import { request, Request, response, Response } from "express";
import { TwitterApi } from "twitter-api-v2";
const prisma = new PrismaClient();

const key = process.env.API_KEY || '';
const secret = process.env.API_KEY_SECRET || '';
let oauthToken = '';
let oauthSecret = '';
let userId = '';

export const oauth = async (req: Request, res: Response) => {
  try {
    const client = new TwitterApi({ appKey: key!, appSecret: secret! });
    userId = req.params.id;
    // generate auth link
    const authLink = await client.generateAuthLink(process.env.CALLBACK_URL, { linkMode: 'authorize' });
    const { url, oauth_token, oauth_token_secret } = authLink
    console.log(url, oauth_token, oauth_token_secret);
    oauthToken = oauth_token
    oauthSecret = oauth_token_secret
    res.send({ url: url, oauth_token: oauth_token, oauth_token_secret: oauth_token_secret })

  } catch (error) {
    console.log('error in oauth in twitter-auth.ts module', error )

  }

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


