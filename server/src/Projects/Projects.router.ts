import express from 'express';
import { authValidator } from '@/utils/authValidator';
import {
  createProject,
  getAllProjectsByUser,
  getAllProjectsByOrg,
  deleteProjectById,
} from './Projects.controller';

const router = express.Router();

router.get('/', [authValidator, getAllProjectsByUser]);
router.get('/:id', [authValidator, getAllProjectsByOrg]);
router.post('/', [authValidator, createProject]);
router.delete('/:id', [authValidator, deleteProjectById]);

export default router;
