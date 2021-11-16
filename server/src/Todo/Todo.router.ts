import express from 'express';
import { createTodo, deleteTodo, updateTodo } from './Todo.controller';

const router = express.Router();

router.post('/', createTodo);
router.patch('/', updateTodo);
router.delete('/', deleteTodo);

export default router;
