import { useState } from "react";

export function Search({ notes, searchText, setSearchText }) {
  const changeSearchText = (event) => {
    setSearchText((event.target.value).toLowerCase());
  }

  return (
    <div className="search-bar-div">
      <img className="search-icon" src="../../public/search-icon.png" width={30}/>
      <input
        className="search-bar"
        placeholder="Search notes"
        type="text"
        onChange={changeSearchText}
        value={searchText}
      />
    </div>
  );
}