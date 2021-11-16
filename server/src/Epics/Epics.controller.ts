import { Request, Response } from 'express';
import { queryValidator } from '../../lib/utils/requestValidator';
import { getRepository } from 'typeorm';

import Epics from './Epics.entity';

export const getAllEpicsByProject = async (req: Request, res: Response) => {
  try {
    if (!queryValidator(req.query, ['projectId'])) {
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

export const findEpicById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new Error('id should be in request url');
    }
    const { id } = req.params;
    const result = await getRepository(Epics).findOne(id);
    if (!result) {
      throw new Error(`cannot find Epic with id ${id}`);
    }
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({
      message: (e as Error).message,
    });
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

/**
 *
 * @param id: 삭제하려는 에픽의 id
 * @response 실행 결과를 나타내는 문자열
 */
export const deleteEpicById = async (req: Request, res: Response) => {
  try {
    await getRepository(Epics)
      .createQueryBuilder()
      .delete()
      .from(Epics)
      .where('id = :id', { id: req.params.id })
      .execute();
    res.status(200).json({ message: 'successfully deleted' });
  } catch (e) {
    res.status(404).json({
      message: (e as Error).message,
    });
  }
};
