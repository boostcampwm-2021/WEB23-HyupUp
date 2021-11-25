import express from 'express';
import { authValidator } from '../../lib/utils/authValidator';
import {
  getAllStoriesByProject,
  getStoryById,
  postStory,
  updateStoryWithName,
  updateStoryWithId,
  deleteStoryWithId,
} from './Stories.controller';

const router = express.Router();

router
  .get('/', [authValidator, getAllStoriesByProject])
  .get('/:id', [authValidator, getStoryById])
  .post('/', [authValidator, postStory])
  .patch('/name/:id', [authValidator, updateStoryWithName])
  .patch('/order/:id', [authValidator, updateStoryWithId])
  .delete('/', [authValidator, deleteStoryWithId]);

export default router;
