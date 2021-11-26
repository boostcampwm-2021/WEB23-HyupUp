import express from 'express';
import { authValidator } from '../utils/authValidator';
import {
  deleteTask,
  getAllTasksByProject,
  getTasksByStoryId,
  updateTask,
} from './Tasks.controller';

const router = express.Router();

router.get('/', [authValidator, getAllTasksByProject]);

router.get('/:id', [authValidator, getTasksByStoryId]);

router.patch('/', [authValidator, updateTask]);

router.delete('/', [authValidator, deleteTask]);

export default router;
