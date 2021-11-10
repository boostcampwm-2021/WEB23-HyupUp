import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';

import Epics from './Epics.entity';

export const getAllEpicsByProject = async (req: Request, res: Response) => {
  try {
    if (!Object.keys(req.query).includes('projectName')) {
      throw new Error('query is not vaild');
    }
    const { projectName } = req.query;
    const epicRepository = getRepository(Epics);
    const epics = await epicRepository.find({
      relations: ['projects'],
      where: { projects: { name: projectName } },
    });
    res.status(200).json(epics);
  } catch (e) {
    const result = (e as Error).message;
    if (result === 'query is not vaild') {
      res.status(400).json(result);
    }
  }
};

/**
 *
 * @body projectName: string | number 대상 프로젝트의 id값
 * @body name: string 새롭게 생성하는 에픽의 이름
 * @response id: number 새롭게 생성된 에픽의 id값
 */
export const createEpic = async (req: Request, res: Response) => {
  try {
    const result = await getRepository(Epics)
      .createQueryBuilder()
      .insert()
      .into(Epics)
      .values({
        startAt: new Date(),
        endAt: new Date(),
        projects: () => req.body.projectName,
        name: req.body.name,
      })
      .execute();
    res.status(201).json({ id: result.raw.insertId });
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message,
    });
  }
};
