import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import bcrypt from 'bcrypt';
import { bodyValidator, queryValidator } from '../../lib/utils/requestValidator';
import Users from './Users.entity';
import {
  getUserInfo,
  getUsers,
  getUserTasks,
  getUserTodos,
  isValidatedEmail,
} from './Users.service';
import Organizations from '../Organizations/Organizations.entity';

// 왜 인식을 못하지...?
declare module 'express-session' {
  interface SessionData {
    isLogIn: boolean;
    email: string;
  }
}

export const handleGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // test login button 때문에 query 유지
    const email = req.session.isLogIn ? (req.session.email as string) : (req.query.email as string);
    if (!isValidatedEmail(email)) throw Error();
    const user = await getUserInfo(email);
    const todos = await getUserTodos(email);
    const tasks = await getUserTasks(email);
    res.json({
      ...user,
      privateTasks: todos,
      projectTasks: tasks,
    });
  } catch (err) {
    const message = (err as Error).message;
    res.status(400).json({ message });
    next(err);
  }
};

export const getUsersByOrganization = async (req: Request, res: Response) => {
  try {
    if (!queryValidator(req.query, ['organizationId'])) {
      throw new Error('query is not valid');
    }
    const users = await getUsers(+(req.query.organizationId as string));
    const nameAndProfiles = users.map((el) => ({
      name: el.name,
      imageURL: el.imageURL,
      index: el.id,
      job: el.job,
      admin: el.admin,
    }));
    res.status(200).json(nameAndProfiles);
  } catch (e) {
    const err = e as Error;
    res.status(400).json(err.message);
  }
};

export const deleteUserById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) throw new Error('param is not valid');
    const users = getRepository(Users);
    await users.delete({ id: +req.params.id });
    res.end();
  } catch (e) {
    const err = e as Error;
    res.status(400).json({ message: err.message });
  }
};

export const updateUserAdminById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) throw new Error('param is not valid');
    if (typeof req.body.admin === 'undefined') throw new Error('body is invalid');
    const users = getRepository(Users);
    const newAdmin = req.body.admin === 'true' ? true : false;
    await users.update({ id: +req.params.id }, { admin: newAdmin });
    res.end();
  } catch (e) {
    const err = e as Error;
    res.status(400).json({ message: err.message });
  }
};

export const logInUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!bodyValidator(req.body, ['email', 'password'])) {
      throw new Error('invalid input');
    }
    req.session.regenerate((err) => {
      if (err) throw new Error('session is not created');
      req.session.isLogIn = true;
      req.session.email = req.body.email;
    });
    const userRepository = getRepository(Users);
    const user = await userRepository.findOne({
      where: { email: req.body.email },
    });
    if (typeof user === 'undefined') throw new Error('User is not valid');
    if (!bcrypt.compareSync(req.body.password, user.password))
      throw new Error('password is not valid');
    req.query.email = req.body.email;
    next();
  } catch (e) {
    const err = e as Error;
    if (err.message === 'invalid input') {
      res.status(400).end();
    } else if (err.message === 'User is not valid') {
      res.status(404).end();
    }
    res.status(400).end();
  }
};

export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!bodyValidator(req.body, ['name', 'job', 'email', 'password', 'organization']))
      throw new Error('body is not valid');

    req.session.regenerate((err) => {
      if (err) throw new Error('session is not created');
      req.session.isLogIn = true;
      req.session.email = req.body.email;
    });

    const { name, job, email, password, imageURL } = {
      ...(req.body as {
        name: string;
        job: string;
        email: string;
        password: string;
        imageURL: string;
      }),
    };

    const organizationRepository = getRepository(Organizations);
    const userRepository = getRepository(Users);

    const user = await userRepository.findOne({ where: { email: email } });

    if (user) throw new Error('Email has been used.');

    const organization = await organizationRepository.findOne({
      where: { room: req.body.organization },
    });

    const admin = organization ? false : true;

    const organizationInstance = organization
      ? organization
      : await organizationRepository.save({ room: req.body.organization });

    const encodedPassword = bcrypt.hashSync(password, 10);
    const newUser = await userRepository.save({
      name,
      job,
      email,
      password: encodedPassword,
      org: organizationInstance,
      imageURL,
      admin,
    });

    req.query.email = newUser.email;

    next();
  } catch (e) {
    const err = e as Error;
    if (err.message === 'Email has been used.') {
      res.status(406).json({ message: 'Email has been used.' });
    }
    res.status(400);
  }
};

export const logOut = (req: Request, res: Response) => {
  try {
    req.session.destroy((err) => {
      if (err) throw new Error(err);
    });
    res.clearCookie('connect.sid');
    res.end();
  } catch {
    res.status(400).end();
  }
};
