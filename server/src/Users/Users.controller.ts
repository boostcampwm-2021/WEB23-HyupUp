import { NextFunction, Request, Response } from 'express';
import { getUserInfo, getUserTasks, getUserTodos, isValidatedEmail } from './Users.service';

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
    res.status(400).json({ message: '유저 정보 없음' });
    next(err);
  }
};
