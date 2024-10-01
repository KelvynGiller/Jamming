import React, { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults.js';
import Playlist from '../Playlist/Playlist';
import './App.css';

const App = () => {
  //mocha data
  const [searchResults, setSearchResults] = useState([
    { id: 1, name: "Song 1", artist: "Artist 1", album: "Album 1", uri: 'spotify:track:1'},
    { id: 2, name: "Song 2", artist: "Artist 2", album: "Album 2", uri: 'spotify:track:2'},
    { id: 3, name: "Song 3", artist: "Artist 3", album: "Album 3", uri: 'spotify:track:3'},
  ]);
  //mocha data 2
  const [playlistTracks, setPlaylistTracks] = useState([
    { id: 4, name: 'Playlist Song 1', artist: 'Artist 4', album: 'Album 4', uri:'spotify:track:4' },
    { id: 5, name: 'Playlist Song 2', artist: 'Artist 5', album: 'Album 5', uri:'spotify:track:5' }
  ]);
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

  console.log(`Saving playlist: ${playlistName}`);
  console.log('Track URIs:', trackUris);

  setPlaylistName('New Playlist');
  setPlaylistTracks([]);
};

//return statement
  return (
    <div className="app">
      <h1>Jamming App</h1>
      <SearchBar />
      <SearchResults
        searchResults={searchResults}
        addTrack={addTrack} 
      />
      <Playlist 
        playlistName={playlistName} 
        playlistTracks={playlistTracks} 
        updatePlaylistName={updatePlaylistName} 
        removeTrack={removeTrack}
        savePlaylist={savePlaylist}
      />
    </div>
  );
}

export default App;