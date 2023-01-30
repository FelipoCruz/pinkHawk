import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { userInfo } from 'os';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET!;

export const setTopics = async (req: Request, res: Response) => {
  try {
    const { topics, userEmail } = req.body;
    console.log(req.body);
    const topicsSaved = await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        topics: topics,
      }
    })
    res.status(201).json('Topics Saved');
  } catch (error) {
    console.log('error in CreateUser:' + error);
  }
};

