import express from 'express';
import {
  deleteTask,
  getAllTasksByProject,
  getTasksByStoryId,
  updateTask,
} from './Tasks.controller';

const router = express.Router();

router.get('/', getAllTasksByProject);

router.get('/:id', getTasksByStoryId);

router.patch('/', updateTask);

router.delete('/', deleteTask);

export default router;
