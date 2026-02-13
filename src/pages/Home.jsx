import { useContext, useEffect, useState } from "react";
import { Input } from "../components/Input";
import { RenderNotes } from "../components/RenderNotes";
import './Home.css';
import themeContext from "../components/Theme";
import { Search } from "../components/Search";
import { NoteOpen } from "../components/NoteOpen";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/');

    window.location.reload();
  };

  const { isDarkMode, toggleTheme } = useContext(themeContext);
  
  const [notes, setNotes] = useState([]);
  
  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:5000/notes', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
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


  return (
    <>
      <div className="header-div">
        <Search notes={notes} searchText={searchText} setSearchText={setSearchText} />
        <button className="logout-button" onClick={handleLogout}>Log-Out</button>
        <button className="theme-button" onClick={toggleTheme}>
          {isDarkMode ? '⚪️' : '⚫️'}
        </button>
      </div>
      <div className={`main-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Input isDarkMode={isDarkMode} setNotes={setNotes} />
        <div className="container">
          <div className={`base-div ${isOpen ? 'blur': 'clean'}`}>
            <RenderNotes notes={notes} setNotes={setNotes} searchText={searchText} isDarkMode={isDarkMode} setDisplayID={setDisplayID} setIsOpen={setIsOpen} isOpen={isOpen} />
          </div>
          {isOpen && (
            <div className={`overlay-div ${isDarkMode ? 'dark-mode': 'light-mode'}`}>
              <NoteOpen noteToDisplay={noteToDisplay} isOpen={isOpen} setIsOpen={setIsOpen} setNotes={setNotes} displayID={displayID} isDarkMode={isDarkMode} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home;