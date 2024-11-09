import Playlist from '../models/playlistModel.js';
import mongoose from 'mongoose';
import { fetchSpotifySongDetails } from '../utils/spotify.js';

// Create a new playlist
export const createPlaylist = async (req, res) => {
  try {
    const { name, description, songs, isPublic } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Playlist name is required' });
    }

    if (songs && songs.length > 50) {
      return res.status(400).json({ error: 'Too many songs in playlist' });
    }

    const playlist = new Playlist({
      user: req.user.id,
      name,
      description,
      songs,
      isPublic,
    });

    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    console.error("Error creating playlist:", error.message);
    res.status(500).json({ error: 'Failed to create playlist', message: error.message });
  }
};

// Add song to playlist
export const addSongToPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { songId } = req.body;

    // Validate playlistId and check playlist existence
    if (!mongoose.isValidObjectId(playlistId)) {
      return res.status(400).json({ error: 'Invalid playlist ID' });
    }
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    // Verify user ownership or public access
    if (playlist.user.toString() !== req.user.id && !playlist.isPublic) {
      return res.status(403).json({ error: 'Unauthorized to modify this playlist' });
    }

    // Add song if it’s not already in the playlist
    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.json(playlist);
  } catch (error) {
    console.error("Error adding song to playlist:", error.message);
    res.status(500).json({ error: 'Failed to add song to playlist' });
  }
};

// Remove a song from a playlist
export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { songId } = req.body;
    if (!mongoose.isValidObjectId(playlistId)) {
      return res.status(400).json({ error: 'Invalid playlist ID' });
    }
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    // Verify user ownership or public access
    if (playlist.user.toString() !== req.user._id.toString() && !playlist.isPublic) {
      return res.status(403).json({ error: 'Unauthorized to modify this playlist' });
    }

    playlist.songs = playlist.songs.filter(id => id !== songId);
    await playlist.save();

    res.json(playlist);
  } catch (error) {
    console.error("Error removing song from playlist:", error.message);
    res.status(500).json({ error: 'Failed to remove song from playlist' });
  }
};

// Get user's playlists
export const getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id }).limit(20);
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error.message);
    res.status(500).json({ error: 'Failed to retrieve playlists' });
  }
};

// Share a playlist (set to public)
export const sharePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;

    if (!mongoose.isValidObjectId(playlistId)) {
      return res.status(400).json({ error: 'Invalid playlist ID' });
    }
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized to share this playlist' });
    }
    
    playlist.isPublic = true;
    await playlist.save();
    res.json(playlist);
  } catch (error) {
    console.error("Error sharing playlist:", error.message);
    res.status(500).json({ error: 'Failed to share playlist' });
  }
};

// In the backend
export const getPlaylistWithDetails = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    const songDetailsPromises = playlist.songs.map(songId => fetchSpotifySongDetails(songId));
    const songDetails = await Promise.all(songDetailsPromises);

    res.json({ ...playlist._doc, songDetails });
  } catch (error) {
    console.error("Error fetching playlist with song details:", error.message);
    res.status(500).json({ error: 'Failed to retrieve playlist' });
  }
};
