import React from 'react';
import Track from '../Track/Track';
import './Playlist.css';

const Playlist = ({ playlistName, playlistTracks, updatePlaylistName, removeTrack }) => {
  const handleNameChange = (e) => {
    updatePlaylistName(e.target.value);
  };

  return (
    <div className="playlist">
      <input value={playlistName} onChange={handleNameChange} />
      {playlistTracks.map(track => (
        <Track 
          key={track.id} 
          track={track} 
          removeTrack={removeTrack}
          isRemoval={true}
        />
      ))}
      <button className="playlist-save">SAVE TO SPOTIFY</button>
    </div>
  );
}

export default Playlist;