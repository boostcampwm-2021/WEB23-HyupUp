import { NextFunction, Request, Response } from 'express';

interface User {
  id: number;
  name: string;
  job: string;
  email: string;
  url: string;
  admin: boolean;
  organization: number;
}

const dummyUrl1 =
  'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80';
const dummyUrl2 =
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80';

export const handleGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.query.email as string; // 추후에는 세션에서 email찾아야함

    // db로직
    const isTest1: boolean = email === 'test1@gmail.com';
    const user: User = {
      id: isTest1 ? 1 : 2,
      name: isTest1 ? 'harry' : 'jarry',
      job: isTest1 ? 'FE' : 'BE',
      email: email,
      url: isTest1 ? dummyUrl1 : dummyUrl2,
      admin: isTest1 ? true : false,
      organization: 1,
    };

    res.json(user);
  } catch (err) {
    res.status(400).json({ message: '유저 정보 없음' });
    next(err);
  }
};
