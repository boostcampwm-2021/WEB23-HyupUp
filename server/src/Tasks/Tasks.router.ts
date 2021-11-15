import express from 'express';
import { getAllTasksByProject } from './Tasks.controller';

const router = express.Router();

router.get('/', getAllTasksByProject);

export default router;
