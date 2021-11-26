import express from 'express';
import { authValidator } from '../utils/authValidator';
import {
  deleteTask,
  getAllTasksByProject,
  getTasksByStoryId,
  updateTask,
  postTask,
} from './Tasks.controller';

const router = express.Router();

router
  .get('/', [authValidator, getAllTasksByProject])
  .get('/:id', [authValidator, getTasksByStoryId])
  .post('/', [authValidator, postTask])
  .patch('/', [authValidator, updateTask])
  .delete('/', [authValidator, deleteTask]);

export default router;
