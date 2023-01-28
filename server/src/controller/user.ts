
import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const SECRET_KEY = process.env.SECRET!

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany()
    res.send(allUsers)
  } catch (error) {
    console.log(error);
  }
}

export const createUser= async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // const user = prisma.user.findUnique({where: {email}})
    const hash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data : {
        ...req.body,
        password: hash
      }
    })
    const accessToken = jwt.sign({ id : newUser.id}, SECRET_KEY);
    res.cookie('token', accessToken, { httpOnly: true })
    res.status(200).json("User Created!")
  } catch (error) {
    console.log("error in CreateUser:" + error);
  }
}