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


export const fetchSuggestedTweets = async (req: Request, res: Response) => {
  try {
    const { status, userEmail } = req.body;
    console.log('status is: ' + status);
    console.log('userEmail is: ' + userEmail);
    console.log(req.body);
    const suggestedTweets = await prisma.topics.findMany({ where: { email: userEmail, status: 'suggested' } });
    res.status(201);
    res.send();
  } catch (error) {
    console.log('error in CreateUser:' + error);
  }
};

export const fetchQueuedTweets = async (req: Request, res: Response) => {
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