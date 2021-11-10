import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Users from './Users.entity';
import Todo from '../Todo/Todo.entity';
import Tasks from '../Tasks/Tasks.entity';

interface UserProject {
  id: number;
  name: string;
}

interface PrivateTask {
  id: number;
  name: string;
  status: boolean;
}

interface ProjectTask extends PrivateTask {
  project: UserProject;
}

interface User {
  id: number;
  name: string;
  job: string;
  email: string;
  url: string;
  admin: boolean;
  organization: number;
  projects: Array<UserProject>;
}

const getUserTodos = async (email: string): Promise<PrivateTask[]> => {
  const todoRepository = getRepository(Todo);
  const todos = await todoRepository.find({
    relations: ['users'],
    where: { users: { email } },
  });
  return [...todos].map((elem) => ({
    id: elem.id,
    name: elem.name,
    status: elem.status,
  }));
};

const getUserTasks = async (email: string): Promise<ProjectTask[]> => {
  const taskRepository = getRepository(Tasks);
  const tasks = await taskRepository.find({
    relations: ['users', 'projects'],
    where: { users: { email } },
  });
  return [...tasks].map((elem) => ({
    id: elem.id,
    name: elem.name,
    status: elem.status,
    project: elem.projects,
  }));
};

const getUserInfo = async (email: string): Promise<Users> => {
  const userRepository = getRepository(Users);
  const user = await userRepository.findOne({
    relations: ['projects'],
    where: { email },
  });
  if (!user) throw Error('유저 없음');
  return user;
};

export const handleGet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const email = req.query.email as string; // 추후에는 세션에서 email찾아야함
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
