import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Tasks from './Tasks.entity';
import Stories from '@/Stories/Stories.entity';
import { bodyValidator } from '@/utils/requestValidator';

// FIXME: 사용하지 않는 api??
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

export const getTasksByStoryId = async (req: Request, res: Response) => {
  try {
    if (!req.params.id === undefined) {
      throw new Error('story id is not valid');
    }
    const storyRepostory = getRepository(Stories);
    const taskRepository = getRepository(Tasks);
    const story = await storyRepostory.findOne(req.params.id);
    if (story === undefined) throw new Error('story id is not valid');
    const tasks = await taskRepository.find({
      relations: ['users'],
      where: { stories: { id: +req.params.id } },
    });

    res.status(200).json(
      tasks.map((el) => ({
        id: el.id,
        name: el.name,
        user: el.users ? el.users.name : null,
        userImage: el.users ? el.users.imageURL : null,
        userId: el.users ? el.users.id : null,
      })),
    );
  } catch (e) {
    const result = (e as Error).message;
    if (result === 'story id is not valid') res.status(400).json(result).end();
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    if (!bodyValidator(req.body, ['id', 'name', 'status'])) {
      throw Error('body is not valid');
    }
    const taskRepository = getRepository(Tasks);
    await taskRepository.update(req.body.id, {
      name: req.body.name,
      status: req.body.status,
      users: req.body.userId,
      projects: req.body.projectId,
    });
    res.end();
  } catch (error) {
    const message = (error as Error).message;
    res.status(401).json({ message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    if (!req.query.id) {
      throw new Error('query is not valid');
    }
    const taskRepository = getRepository(Tasks);
    const response = await taskRepository.delete({ id: +req.query.id });
    if (!response.affected) throw new Error('id is not valid');
    res.end();
  } catch (error) {
    const message = (error as Error).message;
    res.status(401).json({ message });
  }
};

export const postTask = async (req: Request, res: Response) => {
  try {
    if (!bodyValidator(req.body, ['name', 'status', 'userId', 'projectId', 'storyId'])) {
      throw new Error();
    }
    const result = await getRepository(Tasks)
      .createQueryBuilder()
      .insert()
      .into(Tasks)
      .values({
        name: req.body.name,
        status: req.body.status,
        users: req.body.userId,
        projects: () => req.body.projectId,
        stories: () => req.body.storyId,
      })
      .execute();
    res.json({ id: result.raw.insertId });
  } catch (error) {
    const message = (error as Error).message;
    res.status(401).json({ message });
  }
};
