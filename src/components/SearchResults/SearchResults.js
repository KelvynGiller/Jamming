import React, { useState } from 'react';
import Track from '../Track/Track';
import './SearchResults.css';


const SearchResults = ({ searchResults }) => {
  console.log(searchResults);
  const [results, setResults] = useState([]);
  return (
    <div className="SearchResults">
      <h2>Results:</h2>
      {searchResults.map(track => (
        <Track key={track.id} track={track} />
      ))}
    </div>
  );
}

export default SearchResults;