import './Settings.css';
import { useState } from 'react';

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

  const sortOptions = [{
    label: 'Last Modified',
    value: 'lastModified'
  }, {
    label: 'Date Created',
    value: 'dateCreated'
  }, {
    label: 'Alphabetical',
    value: 'alphabetical'
  }];

  const [selectedThemePref, setSelectedThemePref] = useState('Light');
  const [selectedFontSize, setSelectedFontSize] = useState('Medium');
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [selectedSortOrder, setSelectedSortOrder] = useState('Last Modified');

  const changeThemePref = (e) => {
    setSelectedThemePref(e.target.value);
    
    const checkVal = isDarkMode ? 'dark' : 'light';
    if( checkVal !== selectedThemePref ) {
      toggleTheme();
    } 
  };

  const changeFontSize = (e) => {
    setSelectedFontSize(e.target.value);
    // Apply font size to app
  };

  const toggleAutoSave = () => {
    setAutoSaveEnabled(!autoSaveEnabled);
    //Implement auto-save logic
  };

  const changeSortOrder = (e) => {
    setSelectedSortOrder(e.target.value);
    //Apply sort order to notes list
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
                <option key={opt.value} value={themeOptions.value}>
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
                <option key={opt.value} value={opt.label}>
                  {opt.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className='theme-options-div'>
          <h3>Auto-Save</h3> 
          <label>
            <input 
              type="checkbox" 
              checked={autoSaveEnabled} 
              onChange={toggleAutoSave}
              style={{ marginRight: '0.5vw', cursor: 'pointer' }}
            />
            <span>{autoSaveEnabled ? 'Enabled' : 'Disabled'}</span>
          </label>
        </div>

        <div className='theme-options-div'>
          <h3>Default Sort Order</h3> 
          <label>
            <select value={selectedSortOrder} onChange={changeSortOrder} className='theme-options-dropdown'>
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.label}>
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