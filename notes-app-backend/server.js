import express from 'express';
import notesRouter from './routes/notes-router.js';
import userRouter from './routes/user-router.js';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import aiRouter from './routes/ai.js';

const app = express();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors({
  origin: [
    'http://localhost:5173', // Local development
    'http://10.151.225.14:5173', // Local network
    'http://localhost:3000', // Alternative local port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(notesRouter);
app.use(userRouter);
app.use(aiRouter);

connectDB(DATABASE_URL);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server running at port ${PORT}`);
})

