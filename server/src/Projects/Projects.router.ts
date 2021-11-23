import express from 'express';
import { createProject, getAllProjectsByUser, getAllProjectsByOrg } from './Projects.controller';

const router = express.Router();

router.get('/', getAllProjectsByUser);
router.get('/:id', getAllProjectsByOrg);
router.post('/', createProject);

export default router;
