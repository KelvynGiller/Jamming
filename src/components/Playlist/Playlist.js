import React from "react";
import Tracklist from "../Tracklist/Tracklist";
import './Playlist.css';

const Playlist = ({ playlistTracks, playlistName, updatePlaylistName }) => {

    return (
        <div className="playlist">
            <input 
                value={playlistName}
                onChange={(e) => updatePlaylistName(e.target.value)}
            />
            <Tracklist tracks={playlistTracks} />
            <button className="playlist-save">SAVE TO SPOTIFY!</button> 

        </div>
    )
}

export default Playlist;