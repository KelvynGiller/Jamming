import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import './SearchResults.css';

const SearchResults = () => {

    const tracks = [
        { id: 1, name: 'Track 1', artist: 'Artist 1', album: 'Album 1' },
        { id: 2, name: 'Track 2', artist: 'Artist 2', album: 'Album 2' },
    ];

    return (
        <div className="search-results">
            <h2>Results</h2>
            <Tracklist tracks={tracks} />
        </div>
    );
};

export default SearchResults;