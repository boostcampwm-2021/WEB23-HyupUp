import { getRepository } from 'typeorm';
import Users from './Users.entity';
import Todo from '../Todo/Todo.entity';
import Tasks from '../Tasks/Tasks.entity';
import { PrivateTask, ProjectTask, User } from '../../types/user';
import Organizations from '../Organizations/Organizations.entity';

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
    createdAt: elem.createdAt,
    updatedAt: elem.updatedAt,
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
    createdAt: elem.createdAt,
    updatedAt: elem.updatedAt,
  }));
};

export const getUserInfo = async (email: string): Promise<User> => {
  const userRepository = getRepository(Users);
  const user = await userRepository.findOne({
    relations: ['projects', 'org'],
    where: { email },
  });
  if (!user) throw Error('유저 없음');

  const result: User = { ...user, organization: user.org.id };
  delete result.org;
  return result;
};

export const isValidatedEmail = (email: string): boolean => {
  if (typeof email !== 'string') return false;
  return true;
};

export const getUsers = async (id: number): Promise<Users[]> => {
  const userRepository = getRepository(Users);
  const organizationRepository = getRepository(Organizations);
  const organization = await organizationRepository.findOne(id);
  if (!organization) throw new Error('조직 없음');
  const users = await userRepository.find({
    relations: ['projects'],
    where: { org: organization },
  });
  if (!users) throw Error('유저 없음');
  return users;
};
