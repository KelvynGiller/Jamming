import React, { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist';
import './App.css';

const mockTracks = [
  { id: 1, name: "Song 1", artist: "Artist 1", album: "Album 1" },
  { id: 2, name: "Song 2", artist: "Artist 2", album: "Album 2" },
  { id: 3, name: "Song 3", artist: "Artist 3", album: "Album 3" },
];

const App = () => {
 
  const [searchResults, setSearchResults] = useState(mockTracks);
console.log(searchResults);
  return (
    <div className="app">
      <h1>Jamming App</h1>
      <SearchBar />
      <SearchResults searchResults={searchResults} />
      <Playlist />
    </div>
  );
}

export default App;