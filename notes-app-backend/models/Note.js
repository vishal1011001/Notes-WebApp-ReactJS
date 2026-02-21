import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {type: String, required: true},
  note: {type: String, required: true},
  isPinned: {type: Boolean, default: false},
});


// _id to id (for frontend)
noteSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

const noteModel = mongoose.model('Note', noteSchema);

//retrieve all notes
const getAllNotes = async (userId) => {
  try {
    const result = await noteModel.find({user: userId});
    return result;
  } catch (error) {
    console.error('error fetching notes from the database: ', error);
  }
}

//create a note
const createNote = async (noteObj) => {
  try {
    const n1 = new noteModel({
      user: noteObj.user,
      title: noteObj.title,
      note: noteObj.note,
      isPinned: noteObj.isPinned,
    });

    const result = await noteModel.insertOne(n1);
  } catch (error) {
    console.error('error adding a note to database: ', error);
  }
}


//update a note
const updateNote = async (id, updateObj, userId) => {
  try {
    const result = await noteModel.updateOne({_id: id}, {
      title: updateObj.title,
      note: updateObj.note,
      isPinned: updateObj.isPinned
    })
  } catch (error) {
    console.error('error updating note on the database: ', error);
  }
}

//delete a note
const deleteNote = async (id) => {
  try {
    const result = await noteModel.findByIdAndDelete(id);
  } catch (error) {
    console.error('error deleting note from the database: ', error);
  }
}
 
export {createNote, getAllNotes, updateNote, deleteNote};