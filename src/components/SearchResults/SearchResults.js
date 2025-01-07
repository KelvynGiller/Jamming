import React, { useState } from 'react';
import Track from '../Track/Track';
import './SearchResults.css';


const SearchResults = ({ searchResults, addTrack }) => {
  console.log("AddTrack:", addTrack);
  const [results, setResults] = useState([]);
  return (
    <div class="search-results" className="SearchResults">
      <h2>Results:</h2>
      {searchResults.map(track => (
        <Track 
          key={track.id} 
          track={track}
          addTrack={addTrack}
          isRemoval={false}
        />
      ))}
    </div>
  );
}
export default SearchResults;