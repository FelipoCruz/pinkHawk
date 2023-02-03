import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { userInfo } from 'os';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET!;

export const setTopics = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { topics } = req.body;
    const topicsSaved = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        topics: topics,
      },
    });
    res.status(201).json(topicsSaved);
  } catch (error) {
    console.log('error in CreateUser:' + error);
  }
};
