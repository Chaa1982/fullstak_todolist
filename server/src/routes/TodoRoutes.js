import { Router } from 'express';
import { TodoController } from '../controllers/TodoController.js';

const router = Router();

router.get('/todos', TodoController.getTodos);
router.post('/todos', TodoController.createTodo);
router.patch('/todos/:id', TodoController.updateTodo);
router.delete('/todos/:id', TodoController.deleteTodo);

export default router;