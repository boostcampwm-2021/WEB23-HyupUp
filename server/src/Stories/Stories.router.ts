import express from 'express';
import cors from 'cors';
import options from '../../lib/corsConfig';
import { getAllStoriesByProject } from './Stories.controller';

const router = express.Router();

router.get('/', cors(options), getAllStoriesByProject);

export default router;
