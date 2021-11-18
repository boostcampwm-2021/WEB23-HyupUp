import express from 'express';
import { inviteByEmail, isValidEmail } from './Email.controller';

const router = express.Router();

router.post('/', inviteByEmail);
router.get('/verify/:token', isValidEmail);

export default router;
