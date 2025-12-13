import { useState } from "react";
import './Input.css';

export function Input({ notes, setNotes }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [noteInput, setNoteInput] = useState('');

  function saveTitleInput(event) {
    setTitleInput(event.target.value);
  }

  function saveNoteInput(event) {
    setNoteInput(event.target.value);
  }

  function addNote() {
    if (!noteInput.trim()) return;
    setNotes([...notes, {
      id: crypto.randomUUID(),
      title: titleInput.trim(),
      note: noteInput.trim()
    }]);
    setNoteInput('');
    setTitleInput('');
    setIsExpanded(false);
  }

  function closeEditor() {
    setIsExpanded(false);
    setNoteInput('');
    setTitleInput('');
  }

  if (!isExpanded) {
    return (
      <div>
        <input
          className="input-bar"
          placeholder="Take a memo"
          onFocus={() => setIsExpanded(true)}
          readOnly={false}
          value={noteInput}
        />
      </div>
    );
  }

  return (
    <div className="main-inp-div">
      <div className="input-div">
        <input
          className="title-input-bar"
          placeholder="Enter title"
          value={titleInput}
          onChange={saveTitleInput}
        />
        <input
          className="note-input-box"
          placeholder="Enter your memo..."
          value={noteInput}
          onChange={saveNoteInput}
          
        />
      </div>
      <div className="input-buttons">
        <button
          className="add-button"
          onClick={addNote}
        >Add</button>
        <button className="close-button" onClick={closeEditor}>X</button>
      </div>
    </div>
  );
}