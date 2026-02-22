import './Settings.css';
import { useState } from 'react';

export function Settings({setIsSettingsOpen, isDarkMode}) {
  const [selectedSettings, setSelectedSettings] = useState('General Settings');
  
  const toggleSettings = (e) => {
    setSelectedSettings(e.target.innerText);
    console.log(selectedSettings);
  }

  return (
    <div className={`settings-main-div ${isDarkMode ? 'dark' : 'light'}`}>
      <h2 style={{marginLeft: '1vw', marginTop: '1vh'}}>Settings</h2>
      <div className="different-settings-toggle-bar">
        <button
          onClick={toggleSettings}
        >General Settings</button>
        <button
          onClick={toggleSettings}
        >Profile Settings</button>
        <button
          onClick={toggleSettings}
        >Notes Settings</button>
        <button
          onClick={toggleSettings}
        >Theme Settings</button>
      </div>
      <button
        className='settings-close-button'
        onClick={() => (setIsSettingsOpen(false))}
      >Close</button>

      <div className='actual-settings-div'>
        {(selectedSettings == 'General Settings') && (
          <div>

          </div>
        )}
      </div>
    </div>
  );
}