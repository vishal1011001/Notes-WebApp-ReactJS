import { useState } from "react";
import './Input.css';

export function Input({ isDarkMode, setNotes, API_URL }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [titleInput, setTitleInput] = useState('');
  const [noteInput, setNoteInput] = useState('');
  const [shouldBePinned, setShouldBePinned] = useState(false);

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
        title: titleInput,
        note: noteInput,
        isPinned: shouldBePinned
      };

      const response = await fetch(`${API_URL}/notes`, {
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
    setPrompt('');
    setIsAiDisOpen(false);
    setShouldBePinned(false);
    setIsExpanded(false);
  }

  function closeEditor() {
    setIsExpanded(false);
    setNoteInput('');
    setTitleInput('');
    setIsAiDisOpen(false);
    setPrompt('');
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && event.shiftKey) {
      console.log("new line added");
    } else if (event.key === 'Enter') {
      event.preventDefault();
      addNote();
    }
  }

  const [isAiDivOpen, setIsAiDisOpen] = useState(false);
  const [prompt, setPrompt] = useState('');

  const changePrompt = (e) => {
    setPrompt(e.target.value);
  }

  const openAiDiv = () => {
    setIsAiDisOpen(!isAiDivOpen);
  }

  const handlePromptSend = async () => {
    try {
      const response = await fetch(`${API_URL}/generate-text`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({"prompt": prompt}),
      });

      if(response.ok) {
        const data = await response.json();
        setNoteInput(noteInput + '\n' + data.text);
        console.log("ai Response fetched", data);
      } else {
        throw new Error('Error Fetching response');
      }

      if(titleInput == '') {
        setTitleInput(prompt);
      }

    } catch (error) {
      console.error("Error Generating response by gemini:", error);
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
      {isAiDivOpen && (
        <div className="input-ai-div">
          <input className="prompt-bar" placeholder="Ask GEMINI"
            value={prompt}
            onChange={changePrompt}
          />
          <button className="ai-prompt-send-button"
            onClick={handlePromptSend}
          ><img src="/send.png" height={27} /></button>
        </div>
      )}
      <div className="input-buttons">
        <button
          className="add-button"
          onClick={addNote}
        >Add</button>
        <button className="input-ai-button"
          onClick={openAiDiv}
        ><img className="gemini-logo-img" src="/gemini-logo.png" height={40} /></button>
        <button className={`input-pin-button ${shouldBePinned ? 'pinned' : 'notpinned'}`}
          onClick={() => (setShouldBePinned(!shouldBePinned))}
        ><img src="/pin.png" height={25}/></button>
        <button className={`close-button ${isDarkMode ? 'dark' : 'light'}`} 
          onClick={closeEditor}
        >Close</button>
      </div>
    </div>
  );
}