import { Request, Response } from 'express';
import { queryValidator } from '@/utils/requestValidator';
import { getRepository, getConnection } from 'typeorm';
import Stories from './Stories.entity';

export const getAllStoriesByProject = async (req: Request, res: Response) => {
  try {
    if (!queryValidator(req.query, ['projectId'])) {
      throw new Error('query is not vaild');
    }

    const { projectId } = req.query;
    const storyRepository = getRepository(Stories);
    const stories = await storyRepository.find({
      relations: ['projects', 'epics'],
      where: { projects: { id: +(projectId as string) } },
    });

    const storiesWithEpicName = stories.map((el) => ({
      id: el.id,
      name: el.name,
      order: el.order,
      status: el.status,
      epicId: el.epics ? el.epics.id : null,
      projectId: el.projects.id ? el.projects.id : null,
    }));

    res.json(storiesWithEpicName);
  } catch (e) {
    const result = (e as Error).message;
    if (result === 'query is not vaild') {
      res.status(400).json(result);
    }
  }
};

export const getStoryById = async (req: Request, res: Response) => {
  try {
    if (!req.params.id) {
      throw new Error('유효한 ID 가 존재하지 않습니다.');
    }
    const { id } = req.params;
    const result = await getRepository(Stories).findOne(id);
    if (!result) {
      throw new Error(`해당 ${id} 를 조회할 수 없습니다`);
    }
    res.json(result);
  } catch (e) {
    res.status(404).json({
      message: (e as Error).message,
    });
  }
};

export const postStory = async (req: Request, res: Response) => {
  try {
    //TODO 생성 후 생성 결과를 반환하도록 query 문 작성
    const result = await getRepository(Stories)
      .createQueryBuilder()
      .insert()
      .into(Stories)
      .values({
        name: req.body.name,
        status: req.body.status,
        order: req.body.order,
        projects: () => req.body.projectId,
        epics: () => req.body.epicId,
      })
      .execute();

    res.json({ id: result.raw.insertId });
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message,
    });
  }
};

export const updateStoryWithName = async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new Error('유효한 ID 가 존재하지 않습니다.');
  }
  const { id } = req.params;
  const { name, status } = req.body;
  try {
    await getConnection()
      .createQueryBuilder()
      .update(Stories)
      .set({ name: name, status: status })
      .where('id = :id', { id: id })
      .execute();

    res.end();
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message,
    });
  }
};

export const updateStoryWithId = async (req: Request, res: Response) => {
  if (!req.params.id) {
    throw new Error('유효한 ID 가 존재하지 않습니다.');
  }
  const { id } = req.params;
  const { name, status, order } = req.body;
  try {
    await getConnection()
      .createQueryBuilder()
      .update(Stories)
      .set({ name: name, status: status, order: order })
      .where('id = :id', { id: id })
      .execute();

    res.end();
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message,
    });
  }
};

export const deleteStoryWithId = async (req: Request, res: Response) => {
  const { storyId } = req.query;
  try {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from(Stories)
      .where('id = :id', { id: storyId })
      .execute();

    res.end();
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message,
    });
  }
};

export const deleteAllByEpicId = async (req: Request, res: Response) => {
  const { epicId } = req.params;
  try {
    await getRepository(Stories)
      .createQueryBuilder()
      .delete()
      // FIXME: 올바른 쿼리문으로 수정
      .where('epicId = :id', { id: epicId })
      .execute();
    res.end();
  } catch (e) {
    res.status(404).json({ message: (e as Error).message });
  }
};
