import { Request, Response, NextFunction } from 'express';
import { queryVaildator } from '../../lib/requestVaildator';
import { getRepository } from 'typeorm';

import Epics from './Epics.entity';

export const getAllEpicsByProject = async (req: Request, res: Response) => {
  try {
    if (!queryVaildator(req.query, ['projectId'])) {
      throw new Error('query is not vaild');
    }
    const { projectId } = req.query;
    const epicRepository = getRepository(Epics);
    const epics = await epicRepository.find({
      relations: ['projects'],
      where: { projects: { id: +(projectId as string) } },
    });
    const result = epics.map((el) => ({
      id: el.id,
      name: el.name,
      startAt: el.startAt,
      endAt: el.endAt,
    }));
    res.status(200).json(result);
  } catch (e) {
    const result = (e as Error).message;
    if (result === 'query is not vaild') {
      res.status(400).json(result);
    }
  }
};
