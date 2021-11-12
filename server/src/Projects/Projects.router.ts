import express from 'express';
import cors from 'cors';
import options from '../../lib/config/corsConfig';
import { getAllProjects } from './Projects.controller';

const router = express.Router();

router.get('/', cors(options), getAllProjects);

export default router;
