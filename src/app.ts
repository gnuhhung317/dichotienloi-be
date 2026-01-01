import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectMongo } from './config/mongo';
import routes from "./routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", routes);

// health check
app.get('/health', async (_req, res) => {
  try {
    // ping database
    await connectMongo();
    res.json({ status: 'ok' });
  } catch (err) {
    res.status(500).json({
      status: 'db-error',
      error: String(err),
    });
  }
});

app.get('/', (_req, res) => {
  res.send('Dichotienloi API');
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
  console.log(`Server running on http://localhost:${PORT}`);
  try {
    await connectMongo();
  } catch (err) {
    console.error('MongoDB connection failed', err);
  }
});
