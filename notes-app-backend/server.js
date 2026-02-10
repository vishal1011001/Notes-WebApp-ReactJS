import express from 'express';
import path from 'path';
import url from 'url';
import router from './routes/notes-router.js';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './db/connectDB.js';

const app = express();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(router);

connectDB(DATABASE_URL);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
})

