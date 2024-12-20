import express from 'express';
import { addSongToPlaylist, createPlaylist, getPlaylistByLink, getPlaylistWithDetails, getUserPlaylists, removeSongFromPlaylist, sharePlaylist } from '../controllers/playlistControllers.js';
import auth from '../middleware/authMiddleware.js';

const router = express.Router();

//create playlist
router.post('/createPlaylist', auth, createPlaylist);
// add song to playlist
router.put('/:playlistId/add-song', auth, addSongToPlaylist);
// romove song from pplaylist
router.put('/:playlistId/remove-song', auth, removeSongFromPlaylist);
//get user playlist
router.get('/getPlaylists', auth, getUserPlaylists);
//playlist share
router.put('/:playlistId/share', auth, sharePlaylist);
//get Playlist by link with songs 
router.get('/:playlistId/link', getPlaylistByLink);
//get playlist with there songs
router.get('/:playlistId', auth, getPlaylistWithDetails);

export default router;
 