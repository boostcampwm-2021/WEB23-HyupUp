import express from 'express';
import { handleGet } from './Users.controller';

const router = express.Router();
router.get('/', handleGet);

export default router;
