import { useState } from "react";
import './NoteOpen.css';

export function NoteOpen({ noteToDisplay, setIsOpen }) {
  const [title, setTitle] = useState(noteToDisplay.title);
  const [note, setNote] = useState(noteToDisplay.note);

  return (
    <div className="open-main-div">
      <div className="open-note-title" >
       <h2 style={{margin: 0}}>{title}</h2>  
      </div>
      <div className="open-note-text" >
        <p>{note}</p>
      </div>

      <button className="exit-button" 
        onClick={() => (setIsOpen(false))}
      >Exit</button>
    </div>
  );
};