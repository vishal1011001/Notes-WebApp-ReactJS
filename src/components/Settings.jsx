import './Settings.css';
import { useEffect, useState } from 'react';

export function Settings({ setIsSettingsOpen, isDarkMode, toggleTheme }) {

  const themeOptions = [{
    label: 'Light',
    value: 'light'
  }, {
    label: 'Dark',
    value: 'dark'
  }];

  const fontSizeOptions = [{
    label: 'Small',
    value: 'small'
  }, {
    label: 'Medium',
    value: 'medium'
  }, {
    label: 'Large',
    value: 'large'
  }];


  const [selectedThemePref, setSelectedThemePref] = useState('Light');
  const [selectedFontSize, setSelectedFontSize] = useState('Medium');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);

  const changeThemePref = (e) => {
    setSelectedThemePref(e.target.value);

    const checkVal = isDarkMode ? 'light' : 'dark';
    if (checkVal !== selectedThemePref) {
      toggleTheme();
    }
  };

  const fontSizeMap = {
    'small': '14px',
    'medium': '16px',
    'large': '18px'
  };

  useEffect(() => {
    const savedSize = localStorage.getItem('fontSize') || 'medium';
    setSelectedFontSize(savedSize);

    document.documentElement.style.setProperty('--base-font-size', fontSizeMap[savedSize]);

  }, []);

  const changeFontSize = (e) => {
    const newSize = e.target.value;
    setSelectedFontSize(newSize);
    document.documentElement.style.setProperty('--base-font-size', fontSizeMap[newSize]);
    localStorage.setItem('fontSize', newSize);
  };

  const toggleAutoSave = () => {
    setAutoSaveEnabled(!autoSaveEnabled);
    //Implement auto-save logic
  };


  return (
    <div className={`settings-main-div ${isDarkMode ? 'dark' : 'light'}`}>
      <h2 style={{ marginLeft: '1vw', marginTop: '1vh' }}>Settings</h2>

      <div className='settings-div'>

        <div className='theme-options-div'>
          <h3>Set Theme Preference</h3>
          <label >
            <select value={selectedThemePref} onChange={changeThemePref} className='theme-options-dropdown'>
              {themeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className='theme-options-div'>
          <h3>Font Size</h3>
          <label>
            <select value={selectedFontSize} onChange={changeFontSize} className='theme-options-dropdown'>
              {fontSizeOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <button
        className='settings-close-button'
        onClick={() => (setIsSettingsOpen(false))}
      >Close</button>
    </div>
  );
}