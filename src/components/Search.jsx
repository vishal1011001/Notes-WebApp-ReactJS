import { useState } from "react";

export function Search({ notes, searchText, setSearchText }) {
  const changeSearchText = (event) => {
    setSearchText(event.target.value);
  }

  return (
    <>
      <input
        className="search-bar"
        placeholder="Search notes"
        type="text"
        onChange={changeSearchText}
        value={searchText}
      />
    </>
  );
}