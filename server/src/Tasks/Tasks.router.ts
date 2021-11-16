import express from 'express';
import { getAllTasksByProject, getTasksByStoryId, updateTask } from './Tasks.controller';

const router = express.Router();

router.get('/', getAllTasksByProject);

router.get('/:id', getTasksByStoryId);

router.patch('/', updateTask);

export default router;
