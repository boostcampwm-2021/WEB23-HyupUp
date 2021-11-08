import { Request, Response } from 'express';

export const handleGet = (req: Request, res: Response) => {
  res.send('ok');
};
