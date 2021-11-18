import express from 'express';
import {
  deleteStoryWithId,
  getAllStoriesByProject,
  postStory,
  updateStoryWithName,
} from './Stories.controller';

const router = express.Router();

router.get('/', getAllStoriesByProject);
router.post('/', postStory);
router.patch('/name', updateStoryWithName);
router.delete('/', deleteStoryWithId);

export default router;
