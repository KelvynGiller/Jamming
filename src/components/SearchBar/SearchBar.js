import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
    const [term, setTerm] = useState('');
  
    const handleChange = (event) => {
      setTerm(event.target.value);
    };
  
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        onSearch(term);
      }
    };
  
    return (
      <div>
        <input
          placeholder="Search for a song"
          value={term}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
        />
        <button onClick={() => onSearch(term)}>Search</button>
      </div>
    );
  };

export default SearchBar;