import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import Stories from './Stories.entity';

export const getAllStoriesByProject = async (req: Request, res: Response) => {
  try {
    if (!('projectName' in req.query)) {
      throw new Error('query is not vaild');
    }
    const { projectName } = req.query;
    const storyRepository = getRepository(Stories);
    const stories = await storyRepository.find({
      relations: ['projects', 'epics'],
      where: { projects: { name: projectName } },
    });
    res.status(200).json(stories);
  } catch (e) {
    const result = (e as Error).message;
    if (result === 'query is not vaild') {
      res.status(400).json(result);
    }
  }
};
