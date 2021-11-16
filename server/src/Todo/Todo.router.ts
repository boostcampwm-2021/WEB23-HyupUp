import express from 'express';
import createTodo, { updateTodo } from './Todo.controller';

const router = express.Router();

router.post('/', createTodo);
router.patch('/', updateTodo);

export default router;
