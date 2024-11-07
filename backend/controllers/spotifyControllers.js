// controllers/spotifyController.js

import {
    searchArtistByName,
    getAlbumsByArtistId,
    getTracksByAlbumId,
    searchAlbumByName,
    getAllAlbumsOfArtist,
    getFeaturedAlbums,
    getFeaturedPlaylists,
    searchPlaylistByName,
    getPlaylistDetailsById,
    searchSongByName,
  } from '../utils/spotify.js';
  
  // Search for an artist by name
  export const searchArtist = async (req, res) => {
    try {
      const { artistName } = req.query;
      const data = await searchArtistByName(artistName);
      res.json(data.artists.items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to search artist' });
    }
  };
  
  // Fetch all albums by artist ID
  export const fetchAllAlbumsByArtistId = async (req, res) => {
    try {
      const { artistId } = req.params;
      const data = await getAllAlbumsOfArtist(artistId);
      res.json(data.items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch all albums of artist' });
    }
  };
  
  // Fetch tracks in an album by album ID
  export const fetchTracksByAlbumId = async (req, res) => {
    try {
      const { albumId } = req.params;
      const data = await getTracksByAlbumId(albumId);
      res.json(data.items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch tracks' });
    }
  };
  
  // Search for an album by name
  export const searchAlbum = async (req, res) => {
    try {
      const { albumName } = req.query;
      const data = await searchAlbumByName(albumName);
      res.json(data.albums.items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to search album' });
    }
  };
  
  // Get featured albums (new releases)
  export const fetchFeaturedAlbums = async (req, res) => {
    try {
      const data = await getFeaturedAlbums();
      res.json(data.albums.items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch featured albums' });
    }
  };
  
  // Get featured playlists
  export const fetchFeaturedPlaylists = async (req, res) => {
    try {
      const data = await getFeaturedPlaylists();
      res.json(data.playlists.items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch featured playlists' });
    }
  };
  
  // Search for a playlist by name
  export const searchPlaylist = async (req, res) => {
    try {
      const { playlistName } = req.query;
      const data = await searchPlaylistByName(playlistName);
      res.json(data.playlists.items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to search playlist' });
    }
  };
  
  // Get details of a specific playlist by playlist ID
  export const fetchPlaylistDetails = async (req, res) => {
    try {
      const { playlistId } = req.params;
      const data = await getPlaylistDetailsById(playlistId);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch playlist details' });
    }
  };
  
  // Search for a song by name
  export const searchSong = async (req, res) => {
    try {
      const { songName } = req.query;
      const data = await searchSongByName(songName);
      res.json(data.tracks.items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to search song' });
    }
  };
  