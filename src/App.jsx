import { useContext, useEffect, useState } from "react";
import { Input } from "./components/Input";
import { RenderNotes } from "./components/RenderNotes";
import './App.css';
import themeContext from "./components/Theme";
import { Search } from "./components/Search";

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

        if(response.ok) {
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

  return (
    <div className={`main-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Search notes={notes} searchText={searchText} setSearchText={setSearchText}/>
      <Input notes={notes} setNotes={setNotes} />
      <RenderNotes notes={notes} setNotes={setNotes} searchText={searchText} isDarkMode={isDarkMode}/>
      <button className="theme-button" onClick={toggleTheme}>
        {isDarkMode ? '⚪️' : '⚫️'}
      </button>
    </div>
  );
}

export default App;