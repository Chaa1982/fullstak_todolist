import express from 'express';
import cors from 'cors';
import TodoRoutes from './routes/todoRoutes.js';

const app = express();

// Middleware
app.use(cors()); // Подключение CORS:  Это позволяет API принимать запросы от различных источников, что необходимо для работы современных веб-приложений.
app.use(express.json()); // Парсинг JSON в теле запроса


// Test endpoint
app.get('/', (req, res) => {
  res.send('Hello, Node.js!!!');
});

// Routes
app.use('/', TodoRoutes);

// Обработка 404
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

export default app;