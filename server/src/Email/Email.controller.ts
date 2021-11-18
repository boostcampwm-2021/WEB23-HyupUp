import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { bodyValidator } from '../../lib/utils/requestValidator';
import { sendMail } from './Email.service';

export const inviteByEmail = (req: Request, res: Response) => {
  try {
    if (!bodyValidator(req.body, ['email', 'organizationId'])) {
      throw Error('body is not valid');
    }
    const secret = process.env.SECRET as string;
    const token = jwt.sign({ id: req.body.organizationId, email: req.body.email }, secret, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });
    // to-do JWT를 저장
    sendMail(req.body.email, token);
    res.status(201).end();
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};

export const isValidEmail = (req: Request, res: Response) => {
  try {
    if (!req.params.token) throw new Error('token is undefined');
    // to-do token에 들어 있는 정보가 맞는지 확인
    // to-do organization 정보를 포함하여 redirect
    const decodedToken = jwt.decode(req.params.token);
    res.end();
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};
