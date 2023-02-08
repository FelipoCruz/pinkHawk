import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { userInfo } from 'os';
import generateTweetAIService from '../integration/gpt2.service';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET!;

export const setTopics = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    const { topics } = req.body;
    const topicsSaved = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        topics: topics,
      },
    });
    if (user && user?.postingHours.length > 0) {
      const newGeneratedTweet = await generateTweetAIService(topics);
      const tweetText = String(newGeneratedTweet?.text);
      const finalTweet = tweetText.replaceAll(/["]+/g, '');
      const finalTweet2 = finalTweet.replaceAll(/&amp;/g, '&');
      console.log('new generated tweet from GPT', newGeneratedTweet);
      const saveTweet = await prisma.tweet.create({
        data: {
          userId: Number(id),
          text: finalTweet2,
          status: 'suggested',
        },
      });
    }
    res.status(201).json(topicsSaved);
  } catch (error) {
    console.log('error in CreateUser:' + error);
  }
};
