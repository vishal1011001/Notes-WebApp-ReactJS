import './RenderNotes.css';

export function RenderNotes({ notes, setNotes, searchText, isDarkMode, setDisplayID, setIsOpen, isOpen, API_URL }) {

  //if there are no notes
  if (!Array.isArray(notes) || notes.length === 0) {
    return (
      <div className="all-notes-div">No notes</div>
    );
  }

  const filteredNotes = notes.filter(note => ((note.note).toLowerCase().trim().includes(searchText.toLowerCase().trim()) || (note.title).toLowerCase().trim().includes(searchText.toLowerCase().trim())));

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


  const pinnedNotes = notesToPrint.filter(note => note.isPinned === true);
  const notPinnedNotes = notesToPrint.filter(note => note.isPinned === false);


  const pinNoteToggle = async (nid) => {
    try {
      const token = localStorage.getItem('token');

      const noteSelected = notes.find(note => note.id === nid);

      const editedNote = {
        id: nid,
        title: noteSelected.title,
        note: noteSelected.note,
        isPinned: !(noteSelected.isPinned),
      };

      const response = await fetch(`${API_URL}/notes/${nid}`, {
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
      console.error("Error pinning note:", error);
    }
  }

  return (
    <div>
      {(pinnedNotes.length !== 0) && (
      <div className='pinned-notes-div'>
        <h3 className='notes-h3-heading'>Pinned Notes <img src='/pin.png' height={15} /></h3>
        {pinnedNotes.map((note) => (
          <div key={note.id} className={`note-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
            onClick={() => noteOpened(note.id)} >
            <button className='pin-button'
              onClick={(e) => {
                e.stopPropagation();
                pinNoteToggle(note.id)
              }}
            ><img src='/pin.png' height={20} /></button>
            <h3 className="note-title">{note.title}</h3>
            <p className='note-text'>{note.note}</p>
          </div>
        ))}
      </div>)}
      <div className={`not-pinned-notes-div ${(pinnedNotes.length === 0) ? 'noPin':'yesPin'}`}>
        <h3 className='notes-h3-heading'>Your Notes:</h3>
        {notPinnedNotes.map((note) => (
          <div key={note.id} className={`note-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`}
            onClick={() => noteOpened(note.id)} >
            <button className='pin-button'
              onClick={(e) => {
                e.stopPropagation();
                pinNoteToggle(note.id)
              }}
            ><img className='pin-img' src='/pin.png' height={20} /></button>
            <h3 className="note-title">{note.title}</h3>
            <p className='note-text'>{note.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}