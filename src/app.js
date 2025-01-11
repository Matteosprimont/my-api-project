import express from 'express';
import path from 'path';
import userRoutes from './routes/userRoutes.js';

const app = express();

app.use(express.json());

app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/users', userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server draait op http://localhost:${PORT}`);
});
