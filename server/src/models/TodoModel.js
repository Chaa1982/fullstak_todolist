import db from '../config/db.js';

export default {
  getAllTodos() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM todolist', (error, results) => {
        if (error) reject(error);
        else resolve(results);
      });
    });
  },

  getTodoById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM todolist WHERE id = ?', [id], (error, results) => {
        if (error) reject(error);
        else resolve(results[0]); // Возвращаем первую запись или null
      });
    });
  },

  addTodo({ task, isDone = false }) {
    return new Promise((resolve, reject) => {
      db.query(
        'INSERT INTO todolist (task, isDone) VALUES (?, ?)',
        [task, isDone],
        (error, results) => {
          if (error) reject(error);
          else resolve({ id: results.insertId, task, isDone });
        }
      );
    });
  },

  deleteTodo(id) {
    return new Promise((resolve, reject) => {
      db.query(
        'DELETE FROM todolist WHERE id = ?',
        [id],
        (error, results) => {
          if (error) reject(error);
          else resolve(results.affectedRows > 0);
        }
      );
    });
  },

  updateTodo(id, updateData) {
    return new Promise((resolve, reject) => {
      // Определяем динамическую часть SET-запроса
      const setClauses = [];
      const values = [];

      // Поддерживаем обновление как isDone, так и task
      if (typeof updateData.isDone !== 'undefined') {
        setClauses.push('isDone = ?');
        values.push(updateData.isDone);
      }

      if (typeof updateData.task !== 'undefined') {
        setClauses.push('task = ?');
        values.push(updateData.task);
      }

      // Если нечего обновлять
      if (setClauses.length === 0) {
        return resolve(false);
      }

      values.push(id); // Добавляем ID в конец для WHERE

      const query = `
      UPDATE todolist 
      SET ${setClauses.join(', ')} 
      WHERE id = ?
    `;

      db.query(
          query,
          values,
          (error, results) => {
            if (error) reject(error);
            else resolve(results.affectedRows > 0);
          }
      );
    });
  }
};