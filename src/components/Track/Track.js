import React from "react"; 
import './Track.css';


const Track = ({ track }) => {
    return (
    <div className="track">
        <h3>{track.name}</h3>
        <p>{track.artist}</p>
        <p>{track.album}</p>

    </div>
    )
}

export default Track;