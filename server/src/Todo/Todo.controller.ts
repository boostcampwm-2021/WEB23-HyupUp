import Users from '../Users/Users.entity';
import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { bodyVaildator } from '../../lib/requestVaildator';
import Todo from './Todo.entity';

export default async function createTodo(req: Request, res: Response) {
  try {
    if (!bodyVaildator(req.body, ['name', 'userId'])) {
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
