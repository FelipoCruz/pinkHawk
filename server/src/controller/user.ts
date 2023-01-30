import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userInfo } from 'os';

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET!;

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const allUsers = await prisma.user.findMany();
    res.send(allUsers);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        ...req.body,
        password: hash,
      },
    });
    const accessToken = jwt.sign({ id: newUser.id }, SECRET_KEY);
    res.cookie('token', accessToken, { httpOnly: true });
    res.status(201).json('User Created!');
  } catch (error) {
    console.log('error in CreateUser:' + error);
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    // user exists?
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }
    // password is OK?
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid email or password');
    }
    // If password OK => return response wiht OK
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    res.cookie('token', accessToken, { httpOnly: true });
    res.status(200).json('User Signed In!');
  } catch (error) {
    console.log('error in CreateUser:' + error);
  }
};
