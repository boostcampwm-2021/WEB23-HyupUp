import express from 'express';
import { authValidator } from '../utils/authValidator';
import {
  createEpic,
  deleteEpicById,
  findEpicById,
  getAllEpicsByProject,
  updateEpicById,
} from './Epics.controller';

const router = express.Router();

router.get('/', [authValidator, getAllEpicsByProject]);
router.get('/:id', [authValidator, findEpicById]);
router.patch('/:id', [authValidator, updateEpicById]);
router.delete('/:id', [authValidator, deleteEpicById]);
router.post('/', [authValidator, createEpic]);

export default router;
