import express from 'express';
import { getOrganizationByName } from './Organizations.controller';

const router = express.Router();

router.get('/', getOrganizationByName);

export default router;
