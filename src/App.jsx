import { useContext, useEffect, useState } from "react";
import { Input } from "./components/Input";
import { RenderNotes } from "./components/RenderNotes";
import './App.css';
import themeContext from "./components/Theme";

function App() {
  const { isDarkMode, toggleTheme } = useContext(themeContext);

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className={`main-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <Input notes={notes} setNotes={setNotes} />
      <RenderNotes notes={notes} setNotes={setNotes} isDarkMode={isDarkMode}/>
      <button className="theme-button" onClick={toggleTheme}>
        {isDarkMode ? '⚪️' : '⚫️'}
      </button>
    </div>
  );
}

export default App;