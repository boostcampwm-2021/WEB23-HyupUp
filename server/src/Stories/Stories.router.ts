import express from 'express';
import { getAllStoriesByProject, postStory, updateStoryWithName } from './Stories.controller';

const router = express.Router();

router.get('/', getAllStoriesByProject);
router.post('/', postStory);
router.patch('/name', updateStoryWithName);

export default router;
