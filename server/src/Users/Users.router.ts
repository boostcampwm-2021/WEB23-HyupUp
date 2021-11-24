import express from 'express';
import {
  deleteUserById,
  getUsersByOrganization,
  handleGet,
  logInUser,
  logOut,
  signUpUser,
  updateUserAdminById,
} from './Users.controller';

const router = express.Router();
router.get('/', handleGet);
router.get('/organization', getUsersByOrganization);

router.put('/admin/:id', updateUserAdminById);

router.delete('/logout', logOut);
router.delete('/:id', deleteUserById);

router.post('/login', [logInUser, handleGet]);
router.post('/signup', [signUpUser, handleGet]);

export default router;
