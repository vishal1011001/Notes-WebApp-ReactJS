import { useNavigate } from 'react-router-dom';
import './SideBar.css';

export function SideBar({toggleTheme,isDarkMode, setIsSettingsOpen}) {
  const navigate = useNavigate();

  const navToSettings = () => {
    setIsSettingsOpen(true);
  }

  const navToHelpPage = () => {
    navigate('/help');
  }

  const handleLogout = () => {
    localStorage.removeItem('token');

    navigate('/');

    window.location.reload();
  };

  return (
    <div className={`side-bar-main ${isDarkMode ? 'dark':'light'}`}>
      <button className='settings-button'
        onClick={navToSettings}
      ><img className='settings-img' src='/settings.png' height={'25'} style={{ 'margin-right': '10px' }} />Settings</button>
      <button className="theme-button" onClick={toggleTheme}>
        {isDarkMode ? '⚪️ Light Mode' : '⚫️ Dark Mode'}
      </button>
      <button className="logout-button" onClick={handleLogout}><img src='/exit.png' height={'25'} style={{'margin-right': '10px' }} />Log-Out</button>
      <button className='help-button' onClick={navToHelpPage} ><img src='/support.png' height={'25'} style={{'margin-right': '10px' }} />Help?</button>
    </div>
  );
}