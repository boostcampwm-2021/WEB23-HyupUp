import { Request, Response, NextFunction } from 'express';
import { queryVaildator } from '../../lib/requestVaildator';
import { getRepository } from 'typeorm';
import Stories from './Stories.entity';

export const getAllStoriesByProject = async (req: Request, res: Response) => {
  try {
    if (!queryVaildator(req.query, ['projectId'])) {
      throw new Error('query is not vaild');
    }
    const { projectId } = req.query;
    const storyRepository = getRepository(Stories);
    const stories = await storyRepository.find({
      relations: ['projects', 'epics'],
      where: { projects: { name: +(projectId as string) } },
    });
    const storiesWithEpicName = stories.map((el) => ({
      id: el.id,
      name: el.name,
      status: el.status,
      epic: el.epics.name,
    }));
    res.status(200).json(storiesWithEpicName);
  } catch (e) {
    const result = (e as Error).message;
    if (result === 'query is not vaild') {
      res.status(400).json(result);
    }
  }
};
