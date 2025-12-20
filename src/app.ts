import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import prisma from './config/prisma';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', async (_req, res) => {
  try {
    await prisma.$connect();
    await prisma.$disconnect();
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({ status: 'db-error', error: String(err) });
  }
});

app.get('/', (_req, res) => res.send('Dichotienloi API'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
