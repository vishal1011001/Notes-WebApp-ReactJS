import { createNote, getAllNotes, updateNote, deleteNote } from '../models/Note.js';
import userModel from '../models/UserModel.js';

//fetch all notes
const getNotes = async (req, res) => {
  const notes = await getAllNotes(req.user.id);

  res.json(notes);
}

//create a note
const postNote = async (req, res, next) => {
  console.log(req.body);
  const newNote = {
    user: req.user.id,
    title: req.body.title.trim(),
    note: req.body.note.trim()
  };

  if (!newNote.title || !newNote.note) {
    throw new Error('Please include title and note both');
  } 
  
  await createNote(newNote);

  res.status(201).json(await getAllNotes(req.user.id));
}

//update a note
const putNote = async (req, res, next) => {
  const id = (req.params.id);
  console.log(id);
  console.log(req.body);

  const updateObj = {
    title: req.body.title.trim(),
    note: req.body.note.trim()
  }
  
  const user = await userModel.findById(req.user.id);
  
  //check if user exists
  if(!user) {
    res.status(401);
    throw new Error('user not found');
  }

  //verification of id before updating
  if(req.user.id !== user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }

  await updateNote(id, updateObj);

  res.status(200).json(await getAllNotes(req.user.id));
}

//delete a note
const delNote = async (req, res, next) => {
  const id = (req.params.id);
  console.log("item deleted:", id);

  const user = await userModel.findById(req.user.id);
  
  //check if user exists
  if(!user) {
    res.status(401);
    throw new Error('user not found');
  }

  //verification of id before updating
  if(req.user.id !== user.id) {
    res.status(401);
    throw new Error('user not authorized');
  }
  
  await deleteNote(id);

  res.status(200).json(await getAllNotes(req.user.id));
}

export {getNotes, postNote, putNote, delNote};