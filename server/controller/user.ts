
import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

const prisma = new PrismaClient()

export const getUser = async (req:Request, res:Response) => {
  const users = await prisma.user.findMany()
  res.send(users)
}

