import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET!;

export const authProtect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { token } = req.cookies;
  // if (!token) console.log('No token');
  // console.log('token: ', token);

  // const decoded = jwt.verify(token, SECRET_KEY);
  // if (!decoded) {
  //   console.log('No decoded');
  //   throw new Error('Invalid token');
  // }
  next();
};
