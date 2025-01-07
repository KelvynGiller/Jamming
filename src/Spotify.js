const clientId = '36fa4859f1ee4e0da8f71bd493b25a7b'; 
const redirectUri = 'http://localhost:3000/';
let accessToken;

const Spotify = {
  getAccessToken() {
 
    if (accessToken) {
      return accessToken;
    }


    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

   
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1]; 
      const expiresIn = Number(expiresInMatch[1]); 

 
      window.setTimeout(() => accessToken = '', expiresIn * 1000);
      
 
      window.history.pushState('Access Token', null, '/');
      return accessToken;
    } else {
     
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public playlist-modify-private&redirect_uri=${redirectUri}`;
      window.location = accessUrl;
    }
  },

  
  search(term) {
    const accessToken = this.getAccessToken(); 

    
    if (!accessToken) {
      console.error('No access token found');
      return [];
    }

   
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Request 
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, { headers })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return []; 
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      })
      .catch(error => {
        console.error('Error fetching search results:', error);
        return [];
      });
  },

  // Get user ID
  async getUserId() {
    const accessToken = this.getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user ID');
    }

    const data = await response.json();
    return data.id;
  },

  // Create playlist
  async createPlaylist(userId, playlistName) {
    const accessToken = this.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: playlistName, public: false }),
    });

    if (!response.ok) {
      throw new Error('Failed to create playlist');
    }

    const data = await response.json();
    return data.id;
  },

  // Add musics
  async addTracksToPlaylist(playlistId, trackUris) {
    const accessToken = this.getAccessToken();
    const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: trackUris }), 
    });

    if (!response.ok) {
      throw new Error('Failed to add tracks to playlist');
    }
  },

  // Save the playlist
  async savePlaylist(playlistName, trackUris) {
    try {
      const userId = await this.getUserId();
      const playlistId = await this.createPlaylist(userId, playlistName); 
      await this.addTracksToPlaylist(playlistId, trackUris);
      console.log('Playlist saved successfully!');
    } catch (error) {
      console.error('Error saving playlist:', error);
    }
  }
}

export default Spotify;