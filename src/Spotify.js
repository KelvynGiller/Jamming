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
      const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public playlist-modify-private&redirect_uri=${redirectUri}`
      window.location = accessUrl;
    }
  },

  search(term) {
    const accessToken = this.getAccessToken();
    const headers = {
      Authorization: `Bearer ${accessToken}`
    };

    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
      headers: headers
    })
      .then(response => response.json())
      .then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
        }
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      });
  },

  async getUserId() {
    const accessToken = this.getAccessToken();
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await response.json();
    return data.id;
  },

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
    const data = await response.json();
    return data.id;
  },

  async addTracksToPlaylist(playlistId, trackUris) {
    const accessToken = this.getAccessToken();
    await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uris: trackUris }), 
    });
  },

  async savePlaylist(playlistName, trackUris) {
    const userId = await this.getUserId();
    const playlistId = await this.createPlaylist(userId, playlistName); 
    await this.addTracksToPlaylist(playlistId, trackUris);
  }
}

export default Spotify;