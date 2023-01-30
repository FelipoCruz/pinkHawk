import  {TwitterApi} from 'twitter-api-v2';

// Instantiate with desired auth type (here's Bearer v2 auth)
const key = process.env.API_KEY;
const secret = process.env.API_KEY_SECRET
const accessToken = process.env.ACCESS_TOKEN
const accessSecret = process.env.ACCESS_TOKEN_SECRET
const bearerToken = process.env.BEARER_TOKEN;

const client = new TwitterApi(bearerToken!);


// Tell typescript it's a read and write app
const rwClient = client.readWrite;

export const tweet = async () => {
  try { 
    await rwClient.v2.tweet("Hi, this is Sally! Good morning!😘")
  } catch(error) {
    console.log(error);
  }
}

