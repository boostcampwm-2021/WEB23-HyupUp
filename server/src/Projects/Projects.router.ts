import express from 'express';
import { createProject, getAllProjects } from './Projects.controller';

const router = express.Router();

router.get('/:id', getAllProjects);
router.post('/', createProject);

export default router;
