import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { userInfo } from 'os';
import generateTweetAIService from '../integration/gpt2.service';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET!;

export const generateTweet = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    console.log(req.body);
    const newGeneratedTweet = await generateTweetAIService(user.topics)
    res.status(201);
    res.send(newGeneratedTweet);
  } catch (error) {
    console.log('error in CreateUser:' + error);
  }
};

export const fetchTweets = async (req: Request, res: Response) => {
  try {
    const userIdReq = Number(req.params.id);
    const status = req.params.status;
    console.log('status is: ' + status);
    console.log('userEmail is: ' + userIdReq);
    if (status === 'suggested') {
      const tweets = await prisma.tweet.findMany({ where: { userId: userIdReq, status: 'suggested' } });
      res.status(201);
      res.send(tweets);
    }
    if (status === 'queued') {
      const tweets = await prisma.tweet.findMany({ where: { userId: userIdReq, status: 'queued' } });
      res.status(201);
      res.send(tweets);
    } 
  } catch (error) {
    console.log('Error in fetchTweets @ module controller/tweet.ts: ', error);
  }
};

export const queueTweet = async (req: Request, res: Response) => {
  try {
    const userIdReq = Number(req.params.id);
    const tweetId = Number(req.params.tweetId);
    console.log('userIdReq is: ' + userIdReq );
    console.log('tweetId is: ' + tweetId);
    const queuedTweetOK = await prisma.tweet.update({
      where: { id: tweetId },
      data: { status: 'queued' }, 
    });
      res.status(201);
      res.send(queuedTweetOK);
  } catch (error) {
    console.log('Error in queueTweet @ module controller/tweet.ts: ', error);
  }
}





export const tweetStatusPosted = async (req: Request, res: Response) => {
  try {
    const userIdReq = Number(req.params.id);
    const tweetId = Number(req.params.tweetId);
    console.log('userIdReq: ' + userIdReq );
    console.log('tweetId is: ' + tweetId);
    const tweetStatusPostedOK  = await prisma.tweet.update({
      where: { id: tweetId },
      data: { status: 'posted' }, 
    });
      res.status(201);
      res.send(tweetStatusPostedOK );
  } catch (error) {
    console.log('Error in tweetStatusPosted @ module controller/tweet.ts: ', error);
  }
}



  
