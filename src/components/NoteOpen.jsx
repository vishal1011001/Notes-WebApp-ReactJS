import { useEffect, useState } from "react";
import './NoteOpen.css';

export function NoteOpen({ noteToDisplay, isOpen, setIsOpen, setNotes, displayID, isDarkMode }) {
  const [title, setTitle] = useState(noteToDisplay.title);
  const [note, setNote] = useState(noteToDisplay.note);

  //delete Note
  const deleteNote = async (id) => {
    try {
      setIsOpen(false);

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

  //update an existing note (PUT)
  const editReqSend = async () => {
    try {
      const editedNote = {
        id: displayID,
        title: editTitle,
        note: editText
      };

      const response = await fetch(`http://localhost:5000/notes/${displayID}`, {
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
    <div className={`open-main-div ${isDarkMode ? "dark" : "light"}`}>
      {(isEditing) && (
        <div onKeyDown={handleKeyDown}>
          <input type="text" placeholder="edit note title"
            onChange={changeEditTitle}
            value={editTitle}
            className={`edit-title-bar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
          />
          <textarea
            type="text" placeholder="edit note"
            rows={7}
            columns={230}
            onChange={changeEditText}
            value={editText}
            className={`edit-note-box ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
          />
          <button
            className="edit-save-button"
            onClick={saveEdit}
          >Save</button>
        </div>
      )}
      {(!isEditing) && (
        <>
          <div className="open-note-title" >
            <h2 style={{ margin: 0 }}>{title}</h2>
          </div>
          <div className="open-note-text" >
            <p>{note}</p>
          </div>

          <button className="exit-button"
            onClick={() => (setIsOpen(false))}
          >Exit</button>
        </>
      )}

      <button
        onClick={changeIsEditing}
        className={(isEditing) ? 'cancel-button' : 'edit-button'}
      >{(isEditing) ? 'Cancel' : <img src='public/edit-icon.png' height={15} />}</button>


      <button className="delete-button"
        onClick={() => deleteNote(displayID)}
      >Delete</button>
    </div>
  );
};