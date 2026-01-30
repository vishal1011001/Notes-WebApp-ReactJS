import { useContext, useEffect, useState } from "react";
import { Input } from "./components/Input";
import { RenderNotes } from "./components/RenderNotes";
import './App.css';
import themeContext from "./components/Theme";
import { Search } from "./components/Search";
import { NoteOpen } from "./components/NoteOpen";

function App() {
  const { isDarkMode, toggleTheme } = useContext(themeContext);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('http://localhost:5000/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        console.log('Response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('Fetched data:', data);
          setNotes(data);
        } else {
          console.error('Response not ok:', response.status);
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    }

    fetchNotes();

  }, []);

  const [searchText, setSearchText] = useState('');

  //Single note opened
  const [isOpen, setIsOpen] = useState(false);
  //pass by ID of the note
  const [displayID, setDisplayID] = useState('');

  const noteToDisplay = notes.find(note => note.id === displayID);
  // const noteToDisplay = {
  //   id: 'lmao-001',
  //   title: "hello",
  //   note: "why am i doing this?"
  // };

  // changeDisplayID();

  return (
    <>
      <div className="header-div">
        <Search notes={notes} searchText={searchText} setSearchText={setSearchText} />
        <button className="theme-button" onClick={toggleTheme}>
          {isDarkMode ? '⚪️' : '⚫️'}
        </button>
      </div>
      <div className={`main-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Input notes={notes} setNotes={setNotes} />
        <div className="container">
          <div className="base-div">
            <RenderNotes notes={notes} setNotes={setNotes} searchText={searchText} isDarkMode={isDarkMode} setDisplayID={setDisplayID} setIsOpen={setIsOpen} isOpen={isOpen} />
          </div>
          {isOpen && (
            <div className="overlay-div">
              <NoteOpen noteToDisplay={noteToDisplay} setIsOpen={setIsOpen}/>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;