import express from 'express';
import { authValidator } from '../../lib/utils/authValidator';
import {
  deleteUserById,
  getUsersInfoWithProject,
  getUsersByOrganization,
  handleGet,
  logInUser,
  logOut,
  signUpUser,
  updateUserAdminById,
  updateUserWithProject,
} from './Users.controller';

const router = express.Router();
router.get('/', handleGet);
router.get('/organization', [authValidator, getUsersByOrganization]);
router.get('/:orgId', [authValidator, getUsersInfoWithProject]);

router.put('/admin/:id', [authValidator, updateUserAdminById]);

router.delete('/logout', [authValidator, logOut]);
router.delete('/:id', [authValidator, deleteUserById]);

router.post('/login', [logInUser, handleGet]);
router.post('/signup', [signUpUser, handleGet]);

router.patch('/project', updateUserWithProject);

export default router;
