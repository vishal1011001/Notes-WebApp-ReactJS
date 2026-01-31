import './RenderNotes.css';
import { useState } from 'react';

export function RenderNotes({ notes, setNotes, searchText, isDarkMode, setDisplayID, setIsOpen, isOpen }) {
  

  //if there are no notes
  if (!Array.isArray(notes) || notes.length === 0) {
    return (
      <div className="all-notes-div">No notes</div>
    );
  }


  const filteredNotes = notes.filter(note => ((note.note).toLowerCase().trim().includes(searchText) || (note.title).toLowerCase().trim().includes(searchText)));

  let notesToPrint = [];
  if (searchText === '') {
    notesToPrint = notes;
  } else {
    notesToPrint = filteredNotes;
  }


  const noteOpened = (id) => {
    setIsOpen(true)
    setDisplayID(id);
    console.log(id);
  }

  return (
    <div>
      <div className="all-notes-div">
        {notesToPrint.map((note) => (
          <div key={note.id} className={`note-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`} 
            onClick={() => noteOpened(note.id)} >
              <h3 className="note-title">{note.title}</h3>
              <p className='note-text'>{note.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}