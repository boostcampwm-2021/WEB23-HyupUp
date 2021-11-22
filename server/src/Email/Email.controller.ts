import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { bodyValidator } from '../../lib/utils/requestValidator';
import { sendMail } from './Email.service';
import { createClient } from 'redis';
import { v4 } from 'uuid';

const client = createClient({ host: 'localhost' });

export const inviteByEmail = (req: Request, res: Response) => {
  try {
    if (!bodyValidator(req.body, ['email', 'organizationId'])) {
      throw Error('body is not valid');
    }
    const secret = process.env.SECRET as string;
    const key = v4();
    const token = jwt.sign({ id: key }, secret, {
      algorithm: 'HS256',
      expiresIn: '1h',
    });
    client.set(key, JSON.stringify({ organizationId: req.body.organizationId }));
    sendMail(req.body.email, token);
    res.status(201).end();
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};

export const isValidEmail = (req: Request, res: Response) => {
  try {
    if (!req.params.token) throw new Error('token is undefined');
    // TODO organization 정보를 포함하여 redirect
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.SECRET as string,
    ) as jwt.JwtPayload;
    client.get(decodedToken.id, (err, reply) => {
      if (err) throw new Error(err.message);
      res.send(JSON.parse(reply as string)).end();
    });
  } catch (e) {
    const err = e as Error;
    res.status(400).json({ message: err.message });
    if (err.message === 'jwt expired') {
      res.status(401).json({ message: err.message });
    } else if (err.message === 'invalid token') {
      res.status(403).json({ message: err.message });
    }
    res.end();
  }
};
