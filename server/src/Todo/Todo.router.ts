import express from 'express';
import { authValidator } from '../utils/authValidator';
import { createTodo, deleteTodo, updateTodo } from './Todo.controller';

const router = express.Router();

router.post('/', [authValidator, createTodo]);
router.patch('/', [authValidator, updateTodo]);
router.delete('/', [authValidator, deleteTodo]);

export default router;
