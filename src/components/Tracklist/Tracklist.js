import React from 'react';
import Track from '../Track/Track';

const TrackList = ({ tracks, removeTrack, isRemoval }) => {
  return (
    <div>
      {tracks.map(track => (
        <Track 
        key={track.id} 
        track={track} 
        addTrack={addTrack} 
        removeTrack={removeTrack} 
        isRemoval={true} 
    />
      ))}
    </div>
  );
};

export default TrackList;