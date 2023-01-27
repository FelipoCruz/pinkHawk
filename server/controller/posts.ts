
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express';

const prisma = new PrismaClient()

export const updatePost = async (req:Request, res:Response) => {
  try {
    const {id} = req.params;
    const { published } = req.body;
    const post = await prisma.post.update({
    where: { id: parseInt(id) },
    data: { published: !published },
    })
    res.send(post)
  } catch (error) {
    console.log(error);
  }
}
