import express from 'express';
import cors from 'cors';
import options from '../../lib/config/corsConfig';
import { createEpic, findEpicById, getAllEpicsByProject } from './Epics.controller';

const router = express.Router();

router.get('/', cors(options), getAllEpicsByProject);
router.get('/:id', cors(options), findEpicById);
router.post('/', createEpic);

export default router;
