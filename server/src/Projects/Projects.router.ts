import express from 'express';
import {
  createProject,
  getAllProjectsByUser,
  getAllProjectsByOrg,
  deleteProjectById,
} from './Projects.controller';

const router = express.Router();

router.get('/', getAllProjectsByUser);
router.get('/:id', getAllProjectsByOrg);
router.post('/', createProject);
router.delete('/:id', deleteProjectById);

export default router;
