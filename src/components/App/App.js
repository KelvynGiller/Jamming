import React from 'react'
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <h1>Jamming App</h1>
      <SearchBar />
      <SearchResults />
      <Playlist />
    </div>
  )
}
export default App;
