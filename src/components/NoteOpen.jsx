import { useEffect, useState } from "react";
import './NoteOpen.css';

export function NoteOpen({ noteToDisplay, isOpen, setIsOpen, setNotes, displayID, isDarkMode }) {
  const [title, setTitle] = useState(noteToDisplay.title);
  const [note, setNote] = useState(noteToDisplay.note);

  //delete Note
  const deleteNote = async (id) => {
    try {
      const token = localStorage.getItem('token');

      setIsOpen(false);

      const response = await fetch(`http://localhost:5000/notes/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
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

  //update an existing note (PUT)
  const editReqSend = async () => {
    try {
      const token = localStorage.getItem('token');

      const editedNote = {
        id: displayID,
        title: editTitle,
        note: editText
      };

      const response = await fetch(`http://localhost:5000/notes/${displayID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
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
  const [editTitle, setEditTitle] = useState(noteToDisplay.title);
  const [editText, setEditText] = useState(noteToDisplay.note);

  const changeEditTitle = (event) => {
    setEditTitle(event.target.value);
  }
  const changeEditText = (event) => {
    setEditText(event.target.value);
  }

  const changeIsEditing = () => {
    setIsEditing(!isEditing);
  }

  const saveEdit = async () => {
    await editReqSend();
    setTitle(editTitle);
    setNote(editText);
    changeIsEditing();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      //default behaviour
      console.log("new line added");
    } else if (event.key === 'Enter') {
      event.preventDefault();
      saveEdit();
    }
  }

  //closing note with escape key:
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    }
  }, [isOpen, setIsOpen]);

  return (
    <div className={`open-main-div`}>
      {(isEditing) && (
        <div onKeyDown={handleKeyDown} className='edit-div'>
          <input type="text" placeholder="edit note title"
            onChange={changeEditTitle}
            value={editTitle}
            className={`edit-title-bar ${isDarkMode ? 'dark' : 'light'}`}
          />
          <textarea
            type="text" placeholder="edit note"
            rows={7}
            columns={230}
            onChange={changeEditText}
            value={editText}
            className={`edit-note-area ${isDarkMode ? 'dark' : 'light'}`}
          />
        </div>
      )}
      {(!isEditing) && (
        <div className="open-note-content-div">
          <h2 className="open-note-title">{title}</h2>
          <p className="open-note-text">{note}</p>
        </div>
      )}

      <div className={`open-buttons-div`} >

        <button className="delete-button"
          onClick={() => deleteNote(displayID)}
        ><img src='public/delete.png' height={30} /></button>
        <button
          onClick={changeIsEditing}
          className={`${(isEditing) ? 'cancel-button' : 'edit-button'} ${isDarkMode ? 'dark' : 'light'}`}
        >{(isEditing) ? 'Cancel' : <img src='public/edit-icon.png' height={25} />}</button>

        {isEditing && (
          <button
            className={`edit-save-button ${isDarkMode ? 'dark' : 'light'}`}
            onClick={saveEdit}
          >Save</button>
        )}

        <button className={`close-button ${isDarkMode ? 'dark' : 'light'}`}
          onClick={() => (setIsOpen(false))}
        >Close</button>
      </div>
    </div>
  );
};