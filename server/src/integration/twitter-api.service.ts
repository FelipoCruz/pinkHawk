import { Request, Response } from "express";
import { resolve } from "path";
import { TwitterApi } from "twitter-api-v2";

const key = process.env.API_KEY || '';
const secret = process.env.API_KEY_SECRET
let oauthToken= '';
let oauthSecret='';

//To create the authentication link
export const oauth = async (req: Request, res:Response) => {
  const client = new TwitterApi({ appKey: key!, appSecret: secret! });

  // By default, oauth/authenticate are used for auth links, you can change with linkMode
  // property in second parameter to 'authorize' to use oauth/authorize
  const authLink = await client.generateAuthLink(process.env.CALLBACK_URL, { linkMode: 'authorize' });
  const {url, oauth_token, oauth_token_secret} = authLink
  console.log(url,oauth_token, oauth_token_secret );
  
  oauthToken = oauth_token
  oauthSecret = oauth_token_secret
  res.send({url : url})
}

export const getAccessToken = async (req: Request, res:Response) => {
  const { oauth_token, oauth_verifier } = req.query;
  // Get the saved oauth_token_secret from session
  const oauth_token_secret = oauthSecret
  
  if (!oauth_token || !oauth_verifier || !oauth_token_secret) {
    return res.status(400).send('You denied the app or your session expired!');
  }

  interface TwitterApiTokens {
    appKey: string;
    appSecret: string;
    accessToken?: string;
    accessSecret?: string;
}
  // Obtain the persistent tokens
  // Create a client from temporary tokens
  const apiToken:TwitterApiTokens = { 
    appKey: key!,
    appSecret: secret!,
    accessToken: oauth_token.toString()!,
    accessSecret: oauth_token_secret!,
  };

    const client = new TwitterApi(apiToken)
    const rwClient = client.readWrite;
    await rwClient.login(oauth_verifier as string)
    .then(({ client: loggedClient, accessToken, accessSecret }) => {
      // loggedClient is an authenticated client in behalf of some user
      // Store accessToken & accessSecret somewhere
      console.log(loggedClient);
      // loggedClient.v2.tweet('this is a message from pinkHawk')
      
    })
    .catch(() => res.status(403).send('Invalid verifier or access tokens!'));
    
 }





