import express from 'express';
import {
  createEpic,
  deleteEpicById,
  findEpicById,
  getAllEpicsByProject,
  updateEpicById,
} from './Epics.controller';

const router = express.Router();

router.get('/', getAllEpicsByProject);
router.get('/:id', findEpicById);
router.patch('/:id', updateEpicById);
router.delete('/:id', deleteEpicById);
router.post('/', createEpic);

export default router;
