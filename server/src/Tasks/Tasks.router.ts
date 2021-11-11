import express from 'express';
import cors from 'cors';
import options from '../../lib/config/corsConfig';
import { getAllTasksByProject } from './Tasks.controller';

const router = express.Router();

router.get('/', cors(options), getAllTasksByProject);

export default router;
