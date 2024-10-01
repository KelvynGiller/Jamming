import React from 'react';

const Track = ({ track, addTrack, removeTrack, isRemoval }) => {
  console.log("Received Track:", track);

  if (!track) {
      return <div>Add tracks</div>; 
  }

  const handleAddTrack = () => {
      addTrack(track);
  };

  const handleRemoveTrack = () => {
      removeTrack(track);
  };

  return (
      <div className="Track">
          <h3>{track.name}</h3>
          <p>by {track.artist}, from {track.album}</p>
          {
              isRemoval ? 
              <button onClick={handleRemoveTrack}>Remove</button> : 
              <button onClick={handleAddTrack}>Add</button>
          }
      </div>
  );
}
export default Track;