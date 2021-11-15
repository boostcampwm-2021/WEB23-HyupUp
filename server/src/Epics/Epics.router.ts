import express from 'express';
import { createEpic, findEpicById, getAllEpicsByProject } from './Epics.controller';

const router = express.Router();

router.get('/', getAllEpicsByProject);
router.get('/:id', findEpicById);
router.post('/', createEpic);

export default router;
