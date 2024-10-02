import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const search = () => {
    onSearch(searchTerm);
  };

  return (
    <div className="search-bar">
      <input
        placeholder="Enter a Song, Album, or Artist"
        value={searchTerm}
        onChange={handleTermChange}
      />
      <button className="searchbutton" onClick={search}>SEARCH</button>
    </div>
  );
};

export default SearchBar;