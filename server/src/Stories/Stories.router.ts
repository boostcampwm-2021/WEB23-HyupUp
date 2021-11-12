import express from 'express';
import cors from 'cors';
import options from '../../lib/config/corsConfig';
import { getAllStoriesByProject, postStory } from './Stories.controller';

const router = express.Router();

router.get('/', cors(options), getAllStoriesByProject);
router.post('/', cors(options), postStory);

export default router;
