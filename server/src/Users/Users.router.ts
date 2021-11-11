import express from 'express';
import { getUsersByOrganization, handleGet } from './Users.controller';

const router = express.Router();
router.get('/', handleGet);
router.get('/organization', getUsersByOrganization);

export default router;
