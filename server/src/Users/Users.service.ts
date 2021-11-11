import { getRepository } from 'typeorm';
import Users from './Users.entity';
import Todo from '../Todo/Todo.entity';
import Tasks from '../Tasks/Tasks.entity';

interface ProjectType {
  id: number;
  name: string;
}

interface PrivateTask {
  id: number;
  name: string;
  status: boolean;
}

interface ProjectTask extends PrivateTask {
  project: ProjectType;
}

interface User {
  id: number;
  name: string;
  job: string;
  email: string;
  url: string;
  admin: boolean;
  organization: number;
  projects: Array<ProjectType>;
}

export const getUserTodos = async (email: string): Promise<PrivateTask[]> => {
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

export const getUserTasks = async (email: string): Promise<ProjectTask[]> => {
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

export const getUserInfo = async (email: string): Promise<Users> => {
  const userRepository = getRepository(Users);
  const user = await userRepository.findOne({
    relations: ['projects'],
    where: { email },
  });
  if (!user) throw Error('유저 없음');
  return user;
};

export const isValidatedEmail = (email: string): boolean => {
  if (typeof email !== 'string') return false;
  return true;
};
