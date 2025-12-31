import './RenderNotes.css';
import {useState} from 'react';

export function RenderNotes({notes, setNotes, isDarkMode}) {
  function deleteNote(id) {
    setNotes(prev => prev.filter(note => note.id !== id));
  }

  if(!Array.isArray(notes) || notes.length === 0) {
    return (
      <div className="all-notes-div">No notes</div>
    );
  }

  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState('');
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

    const current = notes.find(note => note.id === id);
    setEditTitle(current.title);
    setEditText(current.note);
  }

  const saveEdit = () => {
    const updatedNotes = notes.map((elem) => {
      if(elem.id === editID) {
        return {id: editID, title: editTitle, note: editText};
      }
      return elem;
    });

    setNotes(updatedNotes);

    changeIsEditing(0);
  };

  const handleKeyDown = (event) => {
    if(event.key === "Enter") {
      saveEdit();
    }
  }


  return (
    <div className="all-notes-div">
      {notes.map((note) => (
        <div key={note.id} className={`note-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          {(isEditing && note.id === editID) && (
            <div onKeyDown={handleKeyDown}>
              <input type="text" placeholder="edit note title"
                onChange={changeEditTitle} 
                value={editTitle}
                className="edit-title-bar"  
              />
              <input type="text" placeholder="edit note"
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
            onClick={() => {changeIsEditing(note.id)}}
            className={(isEditing && note.id===editID) ? 'cancel-button' : 'edit-button'}
          >{(isEditing && note.id === editID) ? 'Cancel' : <img src='public/edit-icon.png' height={15}/>}</button>
        </div>
      ))}
    </div>
  );
}