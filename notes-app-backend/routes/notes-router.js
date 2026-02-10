import express from 'express';
import { createNote, getAllNotes, updateNote, deleteNote } from '../models/Note.js';

const router = express.Router();


router.get('/notes', async (req, res) => {
  const notes = await getAllNotes();

  res.json(notes);
});

router.post('/notes', async (req, res, next) => {
  console.log(req.body);
  const newNote = {
    title: req.body.title.trim(),
    note: req.body.note.trim()
  };

  if (!newNote.title || !newNote.note) {
    throw new Error('Please include title and note both');
  } 
  
  await createNote(newNote);

  res.status(201).json(await getAllNotes());
});

router.put('/notes/:id', async (req, res, next) => {
  const id = (req.params.id);
  console.log(id);
  console.log(req.body);

  const updateObj = {
    title: req.body.title.trim(),
    note: req.body.note.trim()
  }

  await updateNote(id, updateObj);

  res.status(200).json(await getAllNotes());
});

router.delete('/notes/:id', async (req, res, next) => {
  const id = (req.params.id);
  console.log("item deleted:", id);
  
  await deleteNote(id);

  res.status(200).json(await getAllNotes());
});

export default router;