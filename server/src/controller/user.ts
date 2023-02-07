import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    if (!user) {
      res.status(400).json({ message: 'User not found' });
    }
    console.log('user from getUserById: ', user);
    res.status(200).json(user);
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
    const { password, ...userNoPassword } = newUser;
    const accessToken = jwt.sign({ id: newUser.id }, SECRET_KEY);
    res
      .cookie('token', accessToken, { httpOnly: true })
      .status(201)
      .json(userNoPassword);
  } catch (error) {
    console.log('error in CreateUser:' + error);
  }
};

export const signInUser = async (req: Request, res: Response) => {
  try {
    const loginEmail = req.body.email;
    const loginPassword = req.body.password;
    // user exists?
    console.log('accessToken: ');
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
    const { password, ...userNoPassword } = user;
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    console.log('accessToken: ', accessToken);

    res
      .cookie('token', accessToken, { httpOnly: true })
      .status(200)
      .json(userNoPassword);
  } catch (error) {
    console.log('error in CreateUser:' + error);
    res.status(500).json('server problem');
  }
};

export const updateFrequency = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { frequency } = req.body;
    const { postingHours } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { frequencyTweetPosting: Number(frequency), postingHours },
    });
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
};

export const updateAvatar = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { pictureLink } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { profilePicture: pictureLink },
    });
    res.status(200).json(user.profilePicture);
  } catch (error) {
    console.log(error);
  }
};

export const signOutUser = (req: Request, res: Response) => {
  res.cookie('token', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    // httpOnly: true,
  });
  console.log('cookie: ', req.cookies.token);

  res.status(200).json({ status: 'success' });
};
