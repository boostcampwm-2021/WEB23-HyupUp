import express from 'express';
import { getAllProjects } from './Projects.controller';

const router = express.Router();

router.get('/', getAllProjects);

export default router;
