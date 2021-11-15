import express from 'express';
import { getAllTasksByProject, getTasksByStoryId } from './Tasks.controller';

const router = express.Router();

router.get('/', getAllTasksByProject);

router.get('/:id', getTasksByStoryId);

export default router;
