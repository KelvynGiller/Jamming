import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist';
import './App.css';
import Spotify from '../../spotify.js';

const App = () => {
  //search results useState
  const [searchResults, setSearchResults] = useState([]);
  //playlist tracks useState
  const [playlistTracks, setPlaylistTracks] = useState([]);
  //playlist name
  const [playlistName, setPlaylistName] = useState('My Playlist');
 
//update playlist name function
  const updatePlaylistName = (newName) => {
    console.log('New Playlist Name:', newName);
    setPlaylistName(newName);
  };
//add track function
  const addTrack = (track) => {
    if (!playlistTracks.some(existingTrack => existingTrack.id === track.id)) {
      setPlaylistTracks(prevTracks => [...prevTracks, track]);
  }
};
//remove track function
const removeTrack = (track) => {
  setPlaylistTracks(prevTracks => prevTracks.filter(t => t.id !== track.id));
};
//save playlist function
const savePlaylist = () => {
  const trackUris = playlistTracks.map(track => track.uri); 
  Spotify.savePlaylist(playlistName, trackUris) 
    .then(() => {
      console.log(`Playlist "${playlistName}" saved with succes!`);
      setPlaylistTracks([]); 
      setPlaylistName('New Playlist');
    })
    .catch(error => {
      console.error('Error', error);
    });
};
//search function
const searchSpotify = (term) => {
  Spotify.search(term).then(tracks => {
    setSearchResults(tracks);
});
};



//return statement
return (
  <div className="container">
    <h1 className="app-title">Jamming App</h1>
    <div className='panels'>
    <div className="left-panel">
      <h2>Search Songs</h2>
      <SearchBar onSearch={searchSpotify} className="title" />
      <SearchResults
        searchResults={searchResults}
        addTrack={addTrack}
      />
    </div>
    <div className="right-panel">
      <h2>Your Playlist</h2>
      <Playlist 
        playlistName={playlistName}
        playlistTracks={playlistTracks}
        updatePlaylistName={updatePlaylistName}
        removeTrack={removeTrack}
        savePlaylist={savePlaylist}
      />
      </div>
    </div>
  </div>
);
};
export default App;