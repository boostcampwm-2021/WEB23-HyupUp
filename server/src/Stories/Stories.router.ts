import express from 'express';
import {
  deleteStoryWithId,
  getAllStoriesByProject,
  postStory,
  updateStoryWithName,
  updateStoryWithId,
} from './Stories.controller';

const router = express.Router();

router.get('/', getAllStoriesByProject);
router.post('/', postStory);
router.patch('/name', updateStoryWithName);
router.patch('/order', updateStoryWithId);
router.delete('/', deleteStoryWithId);

export default router;
