import { Request, Response, NextFunction } from 'express';
import { bodyValidator } from '../../lib/utils/requestValidator';
import { getRepository } from 'typeorm';

import Users from '../Users/Users.entity';
import Projects from './Projects.entity';

// TODO: User이용하여 조회
export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  return;
};

export const createProject = async (req: Request, res: Response) => {
  try {
    if (!bodyValidator(req.body, ['name', 'userId'])) {
      throw new Error('body is not vaild');
    }
    const userRepository = getRepository(Users);
    const projectRepository = getRepository(Projects);
    const newProject = await projectRepository.save({
      name: req.body.name,
    });
    const user = await userRepository.findOne({
      relations: ['projects'],
      where: { id: req.body.userId },
    });
    if (!user) throw Error('유저 없음');
    user.projects.push(newProject);
    await userRepository.save(user);
    res.json(newProject);
  } catch (error) {
    const message = (error as Error).message;
    res.status(401).json({ message });
  }
};
