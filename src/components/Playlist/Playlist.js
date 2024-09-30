import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import './Playlist.css';

const Playlist = () => {
    const playlistTracks = [];
    return (
        <div className="playlist">
            <h2>Your Playlist</h2>
            <Tracklist tracks={playlistTracks} />
            <button>Save to spotify</button> 

        </div>
    )
}

export default Playlist;