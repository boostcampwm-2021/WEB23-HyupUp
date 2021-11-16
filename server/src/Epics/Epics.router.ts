import express from 'express';
import { createEpic, deleteEpicById, findEpicById, getAllEpicsByProject } from './Epics.controller';

const router = express.Router();

router.get('/', getAllEpicsByProject);
router.get('/:id', findEpicById);
router.delete('/:id', deleteEpicById);
router.post('/', createEpic);

export default router;
