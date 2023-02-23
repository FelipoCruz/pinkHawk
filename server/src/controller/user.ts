import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUser } from '../interfaces/user.interface';

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
    const newUser: IUser = await prisma.user.create({
      data: {
        ...req.body,
        password: hash,
      },
    });
    const accessToken = jwt.sign({ id: newUser.id }, SECRET_KEY);
    newUser.password = undefined;
    newUser.jwtToken = accessToken;
    res.status(201).json(newUser);
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
    console.log('user: ', user);

    if (!user) {
      return res.status(400).send('Invalid email or password');
    }
    // password is OK?
    const isPasswordValid = await bcrypt.compare(loginPassword, user.password);
    console.log('isPasswordValid: ', isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).send('Invalid email or password');
    }

    const foundUser: IUser = user;
    foundUser.password = undefined;
    // If password OK => return response wiht OK
    const accessToken = jwt.sign({ id: user.id }, SECRET_KEY);
    foundUser.jwtToken = accessToken;
    console.log('accessToken: ', accessToken);

    res.status(200).json(foundUser);
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
    console.log('postingHours: ', postingHours);

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

export const updateUserDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { currentPassword, passwordOne, passwordTwo } = req.body;

    if (passwordOne !== passwordTwo) {
      return res.status(400).json({ message: 'New passwords do not match' });
    }

    const user = await prisma.user.findUnique({
      where: { id: Number(id) },
      select: { password: true },
    });

    if (!user) return res.status(400).json({ message: 'User not found' });

    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Wrong Password' });
    } else {
      const newHash = await bcrypt.hash(passwordOne, 10);
      await prisma.user.update({
        where: { id: Number(id) },
        data: {
          password: newHash,
        },
      });
      res.status(200).json({ status: 'success' });
    }
  } catch (error) {
    console.log(error);
  }
};

export const signOutUser = (req: Request, res: Response) => {
  res.status(200).json({ status: 'success' });
};
