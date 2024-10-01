import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import './Playlist.css';

const Playlist = ({ playlistTracks, playlistName }) => {

    return (
        <div className="playlist">
            <input value={playlistName} />
            <Tracklist tracks={playlistTracks} />
            <button className="playlist-save">SAVE TO SPOTIFY!</button> 

        </div>
    )
}

export default Playlist;