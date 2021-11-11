import { Request, Response, NextFunction } from 'express';
import { queryValidator } from '../../lib/utils/requestValidator';
import { getRepository } from 'typeorm';
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

/**
 *
 * @body projectName: string | number 대상 프로젝트의 id값
 * @body name: string 새롭게 생성하는 에픽의 이름
 * @response id: number 새롭게 생성된 에픽의 id값
 */
export const createStory = async (req: Request, res: Response) => {
  try {
    const result = await getRepository(Stories)
      .createQueryBuilder()
      .insert()
      .into(Stories)
      .values({
        id: req.body.storyId,
        name: req.body.storyName,
        status: req.body.status,
        epics: req.body.epicId,
      })
      .execute();
    res.status(201).json({ id: result.raw.insertId });
  } catch (e) {
    res.status(400).json({
      message: (e as Error).message,
    });
  }
};
