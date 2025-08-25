import app from './app.js';
import './config/db.js'; // Подключение к БД

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Лог запуска сервера
});