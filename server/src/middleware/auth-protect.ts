import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.SECRET!;

export const authProtect = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
      if (!token) {
        res.status(400).json({ error: 'token not found' });
      }
      const decoded = jwt.verify(token, SECRET_KEY);
      if (!decoded) {
        res.status(400).json({ error: 'token not valid' });
      }
      next();
    } else {
      res.status(400).json({ error: 'token not found' });
    }
  } catch (error) {
    console.log('unexpected error in authProtect', error);
    res.status(500).json({ error: 'server error', serverError: error });
  }
};
