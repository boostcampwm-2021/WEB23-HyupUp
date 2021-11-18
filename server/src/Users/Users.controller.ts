import { NextFunction, Request, Response } from 'express';
import { queryValidator } from '../../lib/utils/requestValidator';
import {
  getUserInfo,
  getUsers,
  getUserTasks,
  getUserTodos,
  isValidatedEmail,
} from './Users.service';

export const handleGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.query.email as string; // 추후에는 세션에서 email찾아야함
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
