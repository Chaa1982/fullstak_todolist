import mysql from 'mysql2';

const db = mysql.createConnection({
  host: 'localhost',
  port: 8889,
  user: 'root',
  password: 'root',
  database: 'todo_db'
});

// Проверка подключения
db.connect(err => {
  if (err) {
    console.error('MySQL connection error:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

export default db;