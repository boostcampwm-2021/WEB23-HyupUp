import { Request, Response } from 'express';
import { bodyValidator } from 'lib/utils/requestValidator';
import { sendMail } from './Email.service';

export const inviteByEmail = (req: Request, res: Response) => {
  try {
    if (!bodyValidator(req.body, ['email', 'organizationId'])) {
      throw Error('body is not valid');
    }
    // to-do organizationId과 email 포함한 JWT 발급 코드 작성
    // JWT를 저장
    sendMail(req.body.email, 'testjwt');
    res.status(201).end();
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};

export const isValidEmail = (req: Request, res: Response) => {
  try {
    if (!req.params.token) throw new Error('token is undefined');
    // to-do token을 decoding해서 email과 organization 정보를 뽑아냄
    // to-do token에 들어 있는 정보가 맞는지 확인
    // to-do organization 정보를 포함하여 redirect
    res.end();
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};
