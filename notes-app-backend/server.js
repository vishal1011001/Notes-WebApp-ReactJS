import express from 'express';
import path from 'path';
import url from 'url';
import router from './routes/notes-router.js';
import cors from 'cors';


const app = express();

const PORT = process.env.PORT;
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`server running at port ${PORT}`);
})

