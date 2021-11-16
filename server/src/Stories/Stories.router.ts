import express from 'express';
import { getAllStoriesByProject, postStory } from './Stories.controller';

const router = express.Router();

router.get('/', getAllStoriesByProject);
router.post('/', postStory);

export default router;
