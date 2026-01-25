import './RenderNotes.css';
import { useState } from 'react';

export function RenderNotes({ notes, setNotes, searchText, isDarkMode }) {
  //delete Note
  const deleteNote = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/notes/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNotes(data);
      }

    } catch (error) {
      console.error('Error deleting note:', error);
    }

  }

  //if there are no notes
  if (!Array.isArray(notes) || notes.length === 0) {
    return (
      <div className="all-notes-div">No notes</div>
    );
  }

  //update an existing note (PUT)
  const editReqSend = async () => {
    try {
      const editedNote = {
        id: editID,
        title: editTitle,
        note: editText
      };

      const response = await fetch(`http://localhost:5000/notes/${editID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedNote)
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setNotes(data);
      }


    } catch (error) {
      console.error("Error updating note:", error);
    }
  }

  //Editing note state:
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState('0');
  const [editText, setEditText] = useState('');
  const [editTitle, setEditTitle] = useState('');

  const changeEditTitle = (event) => {
    setEditTitle(event.target.value);
  }
  const changeEditText = (event) => {
    setEditText(event.target.value);
  }

  const changeIsEditing = (id) => {
    setIsEditing(!isEditing);
    setEditID(id);

    if (id !== '0') {
      const current = notes.find(note => note.id === id);
      setEditTitle(current.title);
      setEditText(current.note);
    }
  }

  const saveEdit = async () => {
    await editReqSend();

    changeIsEditing('0');
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      saveEdit();
    }
  }

  const filteredNotes = notes.filter(note => ((note.note).toLowerCase().trim().includes(searchText) || (note.title).toLowerCase().trim().includes(searchText)));

  let notesToPrint = [];
  if(searchText === '') {
    notesToPrint = notes;
  } else {
    notesToPrint = filteredNotes;
  }

  return (
    <>
      <div className="all-notes-div">
        {notesToPrint.map((note) => (
          <div key={note.id} className={`note-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
            {(isEditing && note.id === editID) && (
              <div onKeyDown={handleKeyDown}>
                <input type="text" placeholder="edit note title"
                  onChange={changeEditTitle}
                  value={editTitle}
                  className="edit-title-bar"
                />
                <textarea
                  type="text" placeholder="edit note"
                  onChange={changeEditText}
                  value={editText}
                  className='edit-note-bar'
                />
                <button
                  className="edit-save-button"
                  onClick={saveEdit}
                >Save</button>
              </div>
            )}
            {(!isEditing || note.id !== editID) && (
              <>
                <h3 className="note-title">{note.title}</h3>
                <p>{note.note}</p>
              </>
            )}

            <button className="delete-button"
              onClick={() => deleteNote(note.id)}
            >Delete</button>
            <button
              onClick={() => { changeIsEditing(note.id) }}
              className={(isEditing && note.id === editID) ? 'cancel-button' : 'edit-button'}
            >{(isEditing && note.id === editID) ? 'Cancel' : <img src='public/edit-icon.png' height={15} />}</button>
          </div>
        ))}
      </div>
    </>
  );
}