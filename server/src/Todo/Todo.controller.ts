import Users from '../Users/Users.entity';
import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { bodyValidator } from '../../lib/utils/requestValidator';
import Todo from './Todo.entity';

export async function createTodo(req: Request, res: Response) {
  try {
    if (!bodyValidator(req.body, ['name', 'userId'])) {
      throw new Error('body is not vaild');
    }
    const todoRepository = getRepository(Todo);
    const userRepository = getRepository(Users);
    const user = await userRepository.findOne(req.body.userId);
    if (user === undefined) {
      throw new Error('user id is not vaild');
    }
    const todo = await todoRepository.save({
      name: req.body.name,
      status: false,
      users: user,
    });
    res.status(201).json({
      id: todo.id,
      status: todo.status,
      name: todo.name,
      updatedAt: todo.updatedAt,
      createdAt: todo.createdAt,
    });
  } catch (e) {
    const result = (e as Error).message;
    if (result === 'body is not vaild') {
      res.status(400).json(result);
    } else if (result === 'user id is not vaild') {
      res.status(400).json(result);
    }
  }
}

export const updateTodo = async (req: Request, res: Response) => {
  try {
    if (!bodyValidator(req.body, ['id', 'name', 'status'])) {
      throw Error('body is not valid');
    }
    const todoRepository = getRepository(Todo);
    await todoRepository.update(req.body.id, {
      name: req.body.name,
      status: req.body.status,
    });
    res.json('ok');
  } catch (error) {
    const message = (error as Error).message;
    res.json(message);
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    if (!req.query.id) {
      throw Error('body is not valid');
    }
    const todoRepository = getRepository(Todo);
    await todoRepository.delete({ id: +req.query.id });
    res.json('ok');
  } catch (error) {
    const message = (error as Error).message;
    res.json(message);
  }
};
