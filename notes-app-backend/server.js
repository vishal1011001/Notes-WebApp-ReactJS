import express from 'express';
import notesRouter from './routes/notes-router.js';
import userRouter from './routes/user-router.js';
import cors from 'cors';
import connectDB from './db/connectDB.js';
import aiRouter from './routes/ai.js';
import extraRouter from './routes/extras-router.js';

const app = express();

const PORT = process.env.PORT || 5000;
const DATABASE_URL = process.env.DATABASE_URL;

app.use(cors());

app.use(express.json());
app.use(notesRouter);
app.use(userRouter);
app.use(aiRouter);
app.use(extraRouter);

connectDB(DATABASE_URL);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
})

