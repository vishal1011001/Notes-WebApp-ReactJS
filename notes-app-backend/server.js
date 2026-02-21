import express from 'express';
import path from 'path';
import url from 'url';
import notesRouter from './routes/notes-router.js';
import userRouter from './routes/user-router.js';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './db/connectDB.js';
import aiRouter from './routes/ai.js';

const app = express();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors({
  origin: [
    'http://localhost:5173', // Web testing
    'http://10.209.245.14:5173',
    'http://localhost:3000', // Web testing CRA
    'https://localhost',      // Android Capacitor default
    'http://localhost',      // Android Capacitor default
    'capacitor://localhost',  // iOS Capacitor default
    'https://subcortically-nongenetical-kanesha.ngrok-free.dev',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'ngrok-skip-browser-warning']
}));

app.use(express.json());
app.use(notesRouter);
app.use(userRouter);
app.use(aiRouter);

connectDB(DATABASE_URL);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`server running at port ${PORT}`);
})

