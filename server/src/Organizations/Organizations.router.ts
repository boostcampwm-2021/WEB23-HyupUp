import express from 'express';
import { authValidator } from '../../lib/utils/authValidator';
import { getOrganizationByName } from './Organizations.controller';

const router = express.Router();

router.get('/', [authValidator, getOrganizationByName]);

export default router;
