import "./Search.css";

export function Search({ notes, searchText, setSearchText, isDarkMode }) {
  const changeSearchText = (event) => {
    setSearchText((event.target.value));
  }

  const clearSearch = () => {
    setSearchText("");
  }

  return (
    <div className={`search-bar-div ${isDarkMode? 'dark' : 'light'}`}>
      <img className="search-icon" src="/search-icon.png" width={30}/>
      <input
        className="search-bar"
        placeholder="Search notes"
        type="text"
        onChange={changeSearchText}
        value={searchText}
      />
      <button className="clear-search-button" 
        onClick={clearSearch}
      >ⓧ</button>
    </div>
  );
}