import express from 'express';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import newsRoutes from './routes/newsRoutes.js';

const app = express();

app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/users', userRoutes);
app.use('/news', newsRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
