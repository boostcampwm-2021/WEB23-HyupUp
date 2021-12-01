import { Request, Response } from 'express';
import { queryValidator } from '@/utils/requestValidator';
import { getRepository } from 'typeorm';

import Epics from './Epics.entity';

export const getAllEpicsByProject = async (req: Request, res: Response) => {
  const INVALID_ID = 'invalid id';
  const NO_PROJECT_ID = 'no project id';

  try {
    if (!queryValidator(req.query, ['projectId'])) {
      throw new Error(NO_PROJECT_ID);
    }
    const { projectId } = req.query;
    const epicRepository = getRepository(Epics);
    const epics = await epicRepository.find({
      relations: ['projects'],
      where: { projects: { id: +(projectId as string) } },
    });
    if (!epics.length) throw new Error('invalid id');
    const result = epics.map((el) => ({
      id: el.id,
      name: el.name,
      startAt: el.startAt,
      endAt: el.endAt,
      order: +el.order,
    }));
    res.json(result);
  } catch (e) {
    const message = (e as Error).message;
    if (message === INVALID_ID) {
      res.status(404).json({ message });
    } else {
      res.status(400).json({ message });
    }
  }
};

export const findEpicById = async (req: Request, res: Response) => {
  try {
    const { id, name, startAt, endAt, order, projects } = (await getRepository(Epics)
      .createQueryBuilder('epics')
      .leftJoinAndSelect('epics.projects', 'projects')
      .where('epics.id = :id', { id: req.params.id })
      .getOne()) as Epics;
    res.json({
      id,
      name,
      startAt,
      endAt,
      order,
      projectId: projects.id,
    });
  } catch (e) {
    res.status(404).json({
      message: `cannot find epic data with id ${req.params.id}`,
    });
  }
};

/**
 *
 * @body projectId: string | number 대상 프로젝트의 id값
 * @body name: string 새롭게 생성하는 에픽의 이름
 * @response id: number 새롭게 생성된 에픽의 id값
 */
export const createEpic = async (req: Request, res: Response) => {
  try {
    const result = await getRepository(Epics)
      .createQueryBuilder()
      .insert()
      .values({
        name: req.body.name,
        projects: req.body.projectId,
        startAt: req.body.startAt,
        endAt: req.body.endAt,
        order: req.body.order,
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
 * @params id: number 수정하려는 에픽의 id값
 * @body name: string 수정하려는 에픽의 이름
 * @body startAt: 수정하려는 에픽의 시작일
 * @body endAt: 수정하려는 에픽의 종료일
 * @body order: 수정하려는 에픽의 order 값
 * @response message: string 응답결과 메시지
 */
export const updateEpicById = async (req: Request, res: Response) => {
  const INVALID_ID = 'invalid id';

  try {
    const { name, startAt, endAt, order } = req.body;
    const result = await getRepository(Epics)
      .createQueryBuilder()
      .update()
      .set({ name, startAt, endAt, order })
      .where('id = :id', { id: req.params.id })
      .execute();
    if (!result.affected) throw new Error(INVALID_ID);
    res.end();
  } catch (e) {
    const { message } = e as Error;
    if (message === INVALID_ID) res.status(404).json({ message });
    else res.status(400).json({ message });
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
      .where('id = :id', { id: req.params.id })
      .execute();
    res.end();
  } catch (e) {
    res.status(404).json({
      message: (e as Error).message,
    });
  }
};
