import { Request, Response } from 'express';
import { queryValidator } from '@/utils/requestValidator';
import { getRepository } from 'typeorm';
import Organizations from './Organizations.entity';

export const getOrganizationByName = async (req: Request, res: Response) => {
  try {
    if (!queryValidator(req.query, ['name'])) throw new Error('query is not valid');
    const organizationRepository = getRepository(Organizations);
    const organization = await organizationRepository.findOne({ where: { room: req.query.name } });
    if (organization) {
      res.status(200).end();
    } else {
      res.status(204).end();
    }
  } catch (e) {
    const err = e as Error;
    res.status(400).json({ message: err.message });
  }
};
