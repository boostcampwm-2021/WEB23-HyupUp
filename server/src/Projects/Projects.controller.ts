import { Request, Response, NextFunction } from 'express';
import { queryValidator } from '../../lib/utils/requestValidator';
import { getRepository } from 'typeorm';

import Users from '../Users/Users.entity';

export const getAllProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!queryValidator(req.query, ['userId', 'organizationId'])) {
      throw new Error('query is not vaild');
    }
    const { userId, organizationId } = req.query;
    const userRepository = getRepository(Users);
    const projects = await userRepository.find({
      relations: ['projects', 'org'],
      where: { id: +(userId as string), org: { id: +(organizationId as string) } },
    });
    res.status(200).json(projects[0].projects);
  } catch (e) {
    const result = (e as Error).message;
    if (result === 'query is not vaild') {
      res.status(400).json(result);
    }
  }
};
