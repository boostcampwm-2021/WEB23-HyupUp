import express from 'express';
import cors from 'cors';
import options from '../../lib/config/corsConfig';
import { createEpic, getAllEpicsByProject } from './Epics.controller';

const router = express.Router();

router.get('/', cors(options), getAllEpicsByProject);
router.post('/', createEpic);

export default router;
