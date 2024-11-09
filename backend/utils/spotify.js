import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

// Function to get Spotify access token
export const getAccessToken = async () => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
    },
    body: 'grant_type=client_credentials',
  });

  const data = await response.json();
  return data.access_token;
};

// Generic function to fetch from Spotify API with access token
const spotifyFetch = async (url) => {
  const token = await getAccessToken();
  const response = await fetch(url, {
    headers: { 'Authorization': `Bearer ${token}` },
  });
  const data = await response.json();
  return data;
};

// 1. Search for an artist by name
export const searchArtistByName = async (artistName) => {
    const artistData = await spotifyFetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(artistName)}&type=artist&limit=10`);

    const artistsWithAlbums = await Promise.all(
      artistData.artists.items.map(async (artist) => {
        const albumsData = await spotifyFetch(`https://api.spotify.com/v1/artists/${artist.id}/albums?limit=5`);
        return {
          ...artist,
          albums: albumsData.items
        };
      })
    );
  
    return { artists: artistsWithAlbums };
  };
  

// 2. Fetch albums by artist ID
export const getAlbumsByArtistId = async (artistId) => {
  return spotifyFetch(`https://api.spotify.com/v1/artists/${artistId}/albums`);
};

// 3. Fetch tracks in an album by album ID
export const getTracksByAlbumId = async (albumId) => {
  return spotifyFetch(`https://api.spotify.com/v1/albums/${albumId}/tracks`);
};

// 4. Search albums by album name
export const searchAlbumByName = async (albumName) => {
  return spotifyFetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(albumName)}&type=album&limit=10`);
};

// 5. Get all albums of an artist by artist ID
export const getAllAlbumsOfArtist = async (artistId) => {
  return spotifyFetch(`https://api.spotify.com/v1/artists/${artistId}/albums?include_groups=album,single`);
};

// 6. Fetch featured albums (or "New Releases")
export const getFeaturedAlbums = async () => {
  return spotifyFetch(`https://api.spotify.com/v1/browse/new-releases?country=India&limit=10`);
};

// 7. Fetch popular/featured playlists
export const getFeaturedPlaylists = async () => {
  return spotifyFetch(`https://api.spotify.com/v1/browse/featured-playlists?limit=10`);
};

// 8. Search for playlists by name
export const searchPlaylistByName = async (playlistName) => {
  return spotifyFetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(playlistName)}&type=playlist&limit=10`);
};

// 9. Get details of a specific playlist by playlist ID
export const getPlaylistDetailsById = async (playlistId) => {
  return spotifyFetch(`https://api.spotify.com/v1/playlists/${playlistId}`);
};

// 10. Search for songs by name
export const searchSongByName = async (songName) => {
  return spotifyFetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(songName)}&type=track&limit=10`);
};

export const fetchSpotifySongDetails = async (songId) => {
    const url = `https://api.spotify.com/v1/tracks/${songId}`;
    return spotifyFetch(url);
  };