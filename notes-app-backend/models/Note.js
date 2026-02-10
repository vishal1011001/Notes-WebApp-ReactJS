import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
  title: {type: String, required: true},
  note: {type: String, required: true},
});

noteSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  }
});

const noteModel = mongoose.model('Note', noteSchema);

const createNote = async (noteObj) => {
  try {
    const n1 = new noteModel({
      title: noteObj.title,
      note: noteObj.note
    });

    const result = await noteModel.insertOne(n1);
  } catch (error) {
    console.error('error adding a note to database: ', error);
  }
}

const getAllNotes = async () => {
  try {
    const result = await noteModel.find();
    return result;
  } catch (error) {
    console.error('error fetching notes from the database: ', error);
  }
}

const updateNote = async (id, updateObj) => {
  try {
    const result = await noteModel.updateOne({_id: id}, {
      title: updateObj.title,
      note: updateObj.note
    })
  } catch (error) {
    console.error('error updating note on the database: ', error);
  }
}

const deleteNote = async (id) => {
  try {
    const result = await noteModel.findByIdAndDelete(id);
  } catch (error) {
    console.error('error deleting note from the database: ', error);
  }
}
 
export {createNote, getAllNotes, updateNote, deleteNote};