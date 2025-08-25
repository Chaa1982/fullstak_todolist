import TodoModel from '../models/TodoModel.js';

export const TodoController = {
  async getTodos(req, res) {
    try {
      const todos = await TodoModel.getAllTodos();
      res.json(todos);
    } catch (err) {
      res.status(500).json({
        error: 'Database error',
        details: err.message
      });
    }
  },

  async createTodo(req, res) {
    if (!req.body.task) {
      return res.status(400).json({error: 'Task text is required'});
    }

    try {
      const newTodo = await TodoModel.addTodo({
        task: req.body.task,
        isDone: req.body.isDone || false
      });
      res.status(201).json(newTodo);
    } catch (err) {
      res.status(500).json({error: 'Failed to add task'});
    }
  },

  async deleteTodo(req, res) {
    try {
      const {id} = req.params;

      // Используем правильное название метода
      const deleted = await TodoModel.deleteTodo(id);

      if (!deleted) {
        return res.status(404).json({error: 'Todo not found'});
      }

      res.json({message: 'Todo deleted successfully'});
    } catch (error) {
      res.status(500).json({
        error: 'Failed to delete todo',
        details: error.message
      });
    }
  },
  async updateTodo(req, res) {
    try {
      const { id } = req.params;
      const { isDone, task } = req.body;

      // Проверяем, что есть хотя бы одно поле для обновления
      if (typeof isDone === 'undefined' && typeof task === 'undefined') {
        return res.status(400).json({ error: 'Nothing to update' });
      }

      const updateData = {};
      if (typeof isDone !== 'undefined') updateData.isDone = isDone;
      if (task) updateData.task = task;

      const updated = await TodoModel.updateTodo(id, updateData);

      if (!updated) {
        return res.status(404).json({ error: 'Todo not found' });
      }

      // Возвращаем обновленную задачу
      const updatedTodo = await TodoModel.getTodoById(id);
      res.json(updatedTodo);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to update todo',
        details: error.message
      });
    }
  }
};