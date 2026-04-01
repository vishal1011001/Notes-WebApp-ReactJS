import { useContext, useEffect, useState } from "react";
import { Input } from "../components/Input";
import { RenderNotes } from "../components/RenderNotes";
import './Home.css';
import themeContext from "../components/Theme";
import { Search } from "../components/Search";
import { NoteOpen } from "../components/NoteOpen";
import { useNavigate } from "react-router-dom";
import { SideBar } from "../components/SideBar";
import { Settings } from "../components/Settings";
import { UserProfile } from "../components/UserProfile";

function Home({ API_URL, userInfo }) {
  const navigate = useNavigate();

  //sideBar logic:
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const { isDarkMode, toggleTheme } = useContext(themeContext);

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`${API_URL}/notes`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'ngrok-skip-browser-warning': 'true',
          },
        });

        if (response.ok) {
          const data = await response.json();
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

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);


  //user profile
  const [userProfileOpen, setUserProfileOpen] = useState(false);
  const handleUserProfileOpen = () => {
    setUserProfileOpen(!userProfileOpen);
  }

  return (
    <>
      {sideBarOpen && (
        <div className={`side-bar-div ${isDarkMode ? 'dark' : 'light'}`}>
          <SideBar setSideBarOpen={setSideBarOpen} toggleTheme={toggleTheme} isDarkMode={isDarkMode} setIsSettingsOpen={setIsSettingsOpen} />
        </div>
      )}
      <div className={`header-div ${isDarkMode ? 'dark' : 'light'}`}>
        <button
          className="side-bar-toggle-button"
          onClick={() => (setSideBarOpen(!sideBarOpen))}
        >{<img src='/three-line.png' className="three-line-img" alt="icon" />}</button>
        <h2 className="app-name-in-header">VNote App</h2>
        <Search notes={notes} searchText={searchText} setSearchText={setSearchText} isDarkMode={isDarkMode} />
        <div className="user-profile-icon"
          onClick={handleUserProfileOpen}
        >
          <img src="/user.png" height={30}></img>
        </div>
      </div>
      <div className={`main-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        <Input isDarkMode={isDarkMode} setNotes={setNotes} API_URL={API_URL} />
        <div className="container">
          <div className={`base-div ${isOpen ? 'blur' : 'clean'}`}>
            <RenderNotes notes={notes} setNotes={setNotes} searchText={searchText} isDarkMode={isDarkMode} setDisplayID={setDisplayID} setIsOpen={setIsOpen} isOpen={isOpen} API_URL={API_URL} />
          </div>
          {isOpen && (
            <div className={`overlay-div ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
              <NoteOpen noteToDisplay={noteToDisplay} isOpen={isOpen} setIsOpen={setIsOpen} setNotes={setNotes} displayID={displayID} isDarkMode={isDarkMode} API_URL={API_URL} />
            </div>
          )}
          {isSettingsOpen && (
            <div className={`settings-overlay-div ${isDarkMode ? 'dark' : 'light'}`}>
              <Settings setIsSettingsOpen={setIsSettingsOpen} isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
            </div>
          )}
        </div>
        {userProfileOpen && (
          <div className="user-profile-overlay">
            <UserProfile userInfo={userInfo} />
          </div>
        )}
      </div>
    </>
  );
}

export default Home;