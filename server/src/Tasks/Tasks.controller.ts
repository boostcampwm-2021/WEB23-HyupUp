import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Tasks from './Tasks.entity';

export const getAllTasksByProject = async (req: Request, res: Response) => {
  try {
    if (!('projectName' in req.query)) {
      throw new Error('query is not vaild');
    }
    const { projectName } = req.query;
    const taskRepository = getRepository(Tasks);
    const tasks = await taskRepository.find({
      relations: ['projects', 'stories'],
      where: { projects: { name: projectName } },
    });
    res.status(200).json(tasks);
  } catch (e) {
    const result = (e as Error).message;
    if (result === 'query is not vaild') {
      res.status(400).json(result);
    }
  }
};
