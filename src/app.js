import express from 'express';
import path from 'path';
import userRoutes from './routes/userRoutes.js';
import newsRoutes from './routes/newsRoutes.js';

const app = express();

app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/users', userRoutes);
app.use('/news', newsRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
