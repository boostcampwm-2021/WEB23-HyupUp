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
  .get('/id', getStoryById)
  .post('/', postStory)
  .patch('/name', updateStoryWithName)
  .patch('/order', updateStoryWithId)
  .delete('/', deleteStoryWithId);

export default router;
