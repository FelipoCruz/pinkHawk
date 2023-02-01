import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { userInfo } from 'os';
import { TwitterApi } from 'twitter-api-v2';

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

export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });
    const realUser = new TwitterApi({
      appKey: process.env.API_KEY!,
      appSecret: process.env.API_KEY_SECRET!,
      accessToken: user?.twitterToken!,
      accessSecret: user?.twitterSecret!,
    });

    // const sally = await realUser.v2.tweet('test3')
    // console.log(sally);
    res.send(user);
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const newUser = await prisma.user.create({
      data: {
        ...req.body,
        password: hash,
      },
    });
    const accessToken = jwt.sign({ id: newUser.id }, SECRET_KEY);
    res.cookie('token', accessToken, { httpOnly: true });
    const { password, ...userNoPassword } = newUser;
    res.status(201).json(userNoPassword);
  } catch (error) {
    console.log('error in CreateUser:' + error);
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;
    // user exists?
    const user = await prisma.user.findUnique({ where: { email: loginEmail } });
    if (!user) {
      return res.status(400).send('Invalid email or password');
    }
    // password is OK?
    const isPasswordValid = await bcrypt.compare(loginPassword, user.password);
    if (!isPasswordValid) {
      return res.status(400).send('Invalid email or password');
    }
    // If password OK => return response wiht OK
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    res.cookie('token', accessToken, { httpOnly: true });

    const { password, ...userNoPassword } = user;
    res.status(200).json(userNoPassword);
  } catch (error) {
    console.log('error in CreateUser:' + error);
  }
};

export const signOutUser = (req: Request, res: Response) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    // httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};
