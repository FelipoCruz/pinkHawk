import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { userInfo } from 'os';
import generateTweetAIService from '../integration/gpt2.service';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET!;


export const generateTweet = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const newGeneratedTweet = await generateTweetAIService(user.topics);
    if (newGeneratedTweet !== undefined) {
    const tweetText = String(newGeneratedTweet?.text);
    const finalTweet = tweetText.replaceAll(/["]+/g, '');
    let finalTweet2 = finalTweet.replaceAll(/&amp;/g, '&');
    console.log('new generated tweet from GPT', newGeneratedTweet);
    if (!newGeneratedTweet) finalTweet2 = "pinkHawk is awesome";
    const saveTweet = await prisma.tweet.create({
      data: {
        userId: user.id,
        text: finalTweet2,
        status: 'suggested',
      },
    });
    res.status(201);
    res.send(newGeneratedTweet);
  } else{
    res.status(404);
  }
  } catch (error) {
    console.log('error in CreateUser:' + error);
  }
};

export const fetchTweets = async (req: Request, res: Response) => {
  try {
    console.log('fetchTweets')
    const userIdReq = Number(req.params.id);
    const status = req.params.status;
    if (status === 'suggested') {
      const tweets = await prisma.tweet.findMany({
        where: { userId: userIdReq, status: 'suggested' },
      });
      res.status(201);
      res.send(tweets);
    }
    if (status === 'queued') {
      const tweets = await prisma.tweet.findMany({
        where: { userId: userIdReq, status: 'queued' },
        orderBy: { postingTimestamp: 'asc' },
      });
      res.status(201);
      res.send(tweets);
    }
    if (status === 'posted') {
      const tweets = await prisma.tweet.findMany({
        where: { userId: userIdReq, status: 'posted' },
        // orderBy: { postingTimestamp: 'asc' },
      });
      res.status(201);
      res.send(tweets);
    }
  } catch (error) {
    console.log('Error in fetchTweets @ module controller/tweet.ts: ', error);
  }
};

export const queueTweet = async (req: Request, res: Response) => {
  try {
    const userIdReq = Number(req.body.id);
    const tweetId = Number(req.body.tweetId);
    const postingTimestamp = req.body.postingTimestamp;
    console.log('postingTimestamp at body is: ', req.body.postingTimestamp);
    const postingTimestampAsDate = new Date(postingTimestamp);
    const postingTimestampISO = postingTimestampAsDate.toISOString();
    //const postingTimestampISO = postingTimestamp.toISOString();
    console.log('userIdReq is: ' + userIdReq);
    console.log('tweetId is: ' + tweetId);
    const queuedTweetOK = await prisma.tweet.update({
      where: { id: tweetId },
      data: {
        status: 'queued',
        postingTimestamp: postingTimestampISO,
      },
    });
    res.status(201).json(queuedTweetOK);
  } catch (error) {
    console.log('Error in queueTweet @ module controller/tweet.ts: ', error);
  }
};

export const tweetStatusPosted = async (req: Request, res: Response) => {
  try {
    console.log('req.body is: ', req.body);
    const userIdReq = Number(req.body.id);
    const tweetId = Number(req.body.tweetId);
    console.log('userIdReq: ' + userIdReq);
    console.log('tweetId is: ' + tweetId);
    const tweetStatusPostedOK = await prisma.tweet.update({
      where: { id: tweetId },
      data: { status: 'posted' },
    });
    res.status(201);
    res.send(tweetStatusPostedOK);
  } catch (error) {
    console.log(
      'Error in tweetStatusPosted @ module controller/tweet.ts: ',
      error
    );
  }
};

export const tweetDelete = async (req: Request, res: Response) => {

  try {
    console.log('server tweet delete start')
    const tweetId = Number(req.body.tweetId);
    console.log('tweetId is: ' + tweetId);
    const tweetStatusPostedOK = await prisma.tweet.delete({
      where: { id: tweetId },
    });
    console.log('tweetStatusPostedOK is: ' + tweetStatusPostedOK);
    res.status(200).json(tweetId)
    // res.send(tweetId);
  } catch (error) {
    console.log('Error in tweetDelete @ module controller/tweet.ts: ', error);
  }
};

export const updateTweetText = async (req: Request, res: Response) => {
  const { id } = req.params;
  const tweet = req.body;
  try {
    const updatedTweet = await prisma.tweet.update({
      where: { id: Number(id) },
      data: { text: tweet.text },
    });
    res.status(201).json(updatedTweet);
  } catch (error) {
    console.log('Error in updateTweetText @ module controller/tweet.ts: ', error);
  }
}