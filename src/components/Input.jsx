import { useState } from "react";
import './Input.css';

export function Input({ isDarkMode, setNotes }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  function saveTitleInput(event) {
    setTitleInput(event.target.value);
  }

  function saveNoteInput(event) {
    setNoteInput(event.target.value);
  }

  const createNote = async () => {
    try {
      const token = localStorage.getItem('token');
      const newNote = {
        id: crypto.randomUUID(),
        title: titleInput,
        note: noteInput
      };

      const response = await fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newNote)
      })
      console.log(response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched data:", data);
        setNotes(data);
      }

    } catch (error) {
      console.error('Error creating new note:', error);
    }
  };

  async function addNote() {
    if (!noteInput.trim()) return;

    await createNote();

    setNoteInput('');
    setTitleInput('');
    setIsExpanded(false);
  }

  function closeEditor() {
    setIsExpanded(false);
    setNoteInput('');
    setTitleInput('');
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      console.log("new line added");
    } else if (event.key === 'Enter') {
      event.preventDefault();
      addNote();
    }
  }

  if (!isExpanded) {
    return (
      <div>
        <input
          className={`input-bar ${isDarkMode ? 'dark' : 'light'}`}
          placeholder="Take a memo"
          onFocus={() => setIsExpanded(true)}
        />
      </div>
    );
  }

  return (
    <div className="main-inp-div">
      <div className="input-div">
        <input
          className={`title-input-bar ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
          placeholder="Enter title"
          value={titleInput}
          onChange={saveTitleInput}
          onKeyDown={handleKeyDown}
        />
        <textarea
          className={`note-input-box ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
          placeholder="Enter your memo..."
          rows={4}
          columns={40}
          value={noteInput}
          onChange={saveNoteInput}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className="input-buttons">
        <button
          className="add-button"
          onClick={addNote}
        >Add</button>
        <button className={`close-button ${isDarkMode ? 'dark' : 'light'}`} onClick={closeEditor}>Close</button>
      </div>
    </div>
  );
}