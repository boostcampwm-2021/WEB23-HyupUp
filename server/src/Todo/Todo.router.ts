import express from 'express';
import createTodo from './Todo.controller';

const router = express.Router();

router.post('/', createTodo);

export default router;
