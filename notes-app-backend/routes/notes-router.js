import express from 'express';
import { getNotes, postNote, putNote, delNote } from '../controllers/controller.js';
import {protect} from "../middleware/authMiddleware.js";

const notesRouter = express.Router();

notesRouter.get('/notes', protect, getNotes);

notesRouter.post('/notes', protect, postNote);

notesRouter.put('/notes/:id', protect, putNote);

notesRouter.delete('/notes/:id', protect, delNote);

export default notesRouter;