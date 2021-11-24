import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { bodyValidator } from '../../lib/utils/requestValidator';
import { sendMail } from './Email.service';
import { createClient } from 'redis';
import { v4 } from 'uuid';
import { getRepository } from 'typeorm';
import Organizations from '..//Organizations/Organizations.entity';

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
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.SECRET as string,
    ) as jwt.JwtPayload;
    client.get(decodedToken.id, async (err, reply) => {
      if (err) throw new Error(err.message);
      const organizationRepository = getRepository(Organizations);
      const organization = (await organizationRepository.findOne({
        id: JSON.parse(reply as string).organizationId,
      })) as Organizations;
      res.redirect(`${process.env.CLIENT_URL}/signup?name=${organization.room}`);
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
