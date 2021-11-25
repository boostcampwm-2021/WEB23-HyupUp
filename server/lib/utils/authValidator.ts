import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface SessionData {
    isLogIn: boolean;
    email: string;
  }
}

export const authValidator = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.session.isLogIn) throw new Error('session is not valid');
    next();
  } catch (e) {
    res.status(401).end();
  }
};
