import express from 'express';
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
  .get('/', getAllStoriesByProject)
  .get('/:id', getStoryById)
  .post('/', postStory)
  .patch('/name/:id', updateStoryWithName)
  .patch('/order/:id', updateStoryWithId)
  .delete('/', deleteStoryWithId);

export default router;
