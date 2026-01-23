import express from 'express';

const router = express.Router();

let notes = [{
    id: crypto.randomUUID(),
    title: "Hello",
    note: "Hello world"
  }, {
    id: crypto.randomUUID(),
    title: "Medications",
    note: "None"
  }, {
    id: crypto.randomUUID(),
    title: "Shake recipe",
    note: "Milk, banana, muesli, horlicks, peanut butter"
  }, {
    id: crypto.randomUUID(),
    title: "Great things",
    note: "Great health"
  }
];

router.get('/notes', (req, res) => {
  res.json(notes);
});

router.post('/notes', (req, res, next) => {
  console.log(req.body);
  const newNote = {
    id: crypto.randomUUID(),
    title: req.body.title,
    note: req.body.note
  };

  if (!newNote.title || !newNote.note) {
    throw new Error('Please include title and note both');
  } 

  notes.push(newNote);

  res.status(201).json(notes);
});

router.put('/notes/:id', (req, res, next) => {
  const id = (req.params.id);
  console.log(id);
  console.log(req.body);

  const noteToEdit = notes.find((note) => note.id === id);
  noteToEdit.title = req.body.title;
  noteToEdit.note = req.body.note;

  res.status(200).json(notes);
});

router.delete('/notes/:id', (req, res, next) => {
  const id = (req.params.id);
  console.log(id);
  
  notes = notes.filter(note => note.id !== id);

  res.status(200).json(notes);
});

export default router;