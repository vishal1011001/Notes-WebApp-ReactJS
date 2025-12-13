import './RenderNotes.css';

export function RenderNotes({notes, setNotes, isDarkMode}) {
  function deleteNote(id) {
    setNotes(prev => prev.filter(note => note.id !== id));
  }

  if(!Array.isArray(notes) || notes.length === 0) {
    return (
      <div className="all-notes-div">No notes</div>
    );
  }

  return (
    <div className="all-notes-div">
      {notes.map((note) => (
        <div key={note.id} className={`note-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
          <h3 className="note-title">{note.title}</h3>
          <p>{note.note}</p>
          <button className="delete-button"
            onClick={() => deleteNote(note.id)}
          >Delete</button>
        </div>
      ))}
    </div>
  );
}