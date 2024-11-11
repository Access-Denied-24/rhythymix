// routes/spotifyRoutes.js

import express from 'express';
import {
  searchArtist,
  fetchAllAlbumsByArtistId,
  fetchTracksByAlbumId,
  searchAlbum,
  fetchFeaturedAlbums,
  fetchFeaturedPlaylists,
  searchPlaylist,
  fetchPlaylistDetails,
  searchSong,
  multiSearch,
  getSongByGenre,
  
} from '../controllers/spotifyControllers.js';

const router = express.Router();

//Route to search for an artist
router.get('/search/artist', searchArtist);

//get all albums by artist ID
router.get('/artist/:artistId/albums', fetchAllAlbumsByArtistId);

// Route to get tracks by album ID
router.get('/album/:albumId/tracks', fetchTracksByAlbumId);

// Route to search for an album by name
router.get('/search/album', searchAlbum);

// Route to get featured albums (new releases)
router.get('/albums/featured', fetchFeaturedAlbums);

// Route to get featured playlists
router.get('/playlists/featured', fetchFeaturedPlaylists);

// Route to search for a playlist by name
router.get('/search/playlist', searchPlaylist);

// Route to get details of a specific playlist by playlist ID
router.get('/playlist/:playlistId', fetchPlaylistDetails);

// Route to search for a song by name
router.get('/search/song', searchSong);

//multisearch in one search bar like song, album artist 
router.get('/multi-search', multiSearch);

// search song BY genre which is for suggestion 
router.get('/songs/genre', getSongByGenre);

router.get('/test', (req, res) => {
    res.send('Spotify route test is working');
});
export default router;
