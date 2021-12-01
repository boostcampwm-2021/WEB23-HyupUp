import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { createClient } from 'redis';
import { v4 } from 'uuid';
import { getRepository } from 'typeorm';
import { bodyValidator } from '@/utils/requestValidator';
import { sendMail } from './Email.service';
import Organizations from '@/Organizations/Organizations.entity';
import Users from '@/Users/Users.entity';

const client = createClient({ host: process.env.REDIS_HOST });

const EMAIL_ERROR = 'email conflict';

export const inviteByEmail = async (req: Request, res: Response) => {
  try {
    if (!bodyValidator(req.body, ['email', 'organizationId'])) {
      throw Error('body is not valid');
    }
    const user = await getRepository(Users).findOne({ where: { email: req.body.email } });
    if (user) throw new Error(EMAIL_ERROR);
    const secret = process.env.SECRET as string;
    const key = v4();
    const token = jwt.sign({ id: key }, secret, {
      algorithm: 'HS256',
      expiresIn: '1d',
    });
    client.set(
      key,
      JSON.stringify({ organizationId: req.body.organizationId, email: req.body.email }),
    );
    sendMail(req.body.email, token);
    res.status(201).end();
  } catch (e) {
    if ((e as Error).message === EMAIL_ERROR) {
      res.status(409).json({ message: (e as Error).message });
    } else {
      res.status(400).json({ message: (e as Error).message });
    }
  }
};

export const isValidEmail = (req: Request, res: Response) => {
  try {
    if (!req.params.token) throw new Error('token is undefined');
    const secret = process.env.SECRET as string;
    const decodedToken = jwt.verify(
      req.params.token,
      process.env.SECRET as string,
    ) as jwt.JwtPayload;
    if ((decodedToken.exp as number) * 1000 <= Date.now()) {
      throw new Error('invalid token');
    }
    client.get(decodedToken.id, async (err, reply) => {
      if (err) throw new Error(err.message);
      const organizationRepository = getRepository(Organizations);
      const organization = (await organizationRepository.findOne({
        id: JSON.parse(reply as string).organizationId,
      })) as Organizations;
      const token = jwt.sign(
        { room: organization.room, email: JSON.parse(reply as string).email },
        secret,
        {
          algorithm: 'HS256',
          expiresIn: '1h',
        },
      );
      res.redirect(`${process.env.CLIENT_URL}/signup?token=${token}`);
    });
  } catch (e) {
    const err = e as Error;
    res.status(401).json({ message: err.message });
  }
};
