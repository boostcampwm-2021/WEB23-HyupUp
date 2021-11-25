import express from 'express';
import { authValidator } from '../../lib/utils/authValidator';
import { inviteByEmail, isValidEmail } from './Email.controller';

const router = express.Router();

router.post('/', [authValidator, inviteByEmail]);
router.get('/verify/:token', isValidEmail);

export default router;
