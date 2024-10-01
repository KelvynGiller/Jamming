import React from 'react';

const Track = ({ track }) => {
  return (
    <div className="Track">
      <h3>{track.name}</h3>
      <p>by {track.artist}, from {track.album}</p>
    </div>
  );
}

export default Track;