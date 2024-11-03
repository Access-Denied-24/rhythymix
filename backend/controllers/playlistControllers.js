import Playlist from '../models/playlistModel.js';
import User from '../models/userModel.js';
import Song from '../models/songModel.js';
import mongoose from 'mongoose';

// Create a new playlist
export const createPlaylist = async (req, res) => {
  try {
    const { name, description, songs, isPublic } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Playlist name is required' });
    }

    // Limit initial songs if provided
    if (songs && songs.length > 50) {
      return res.status(400).json({ error: 'Too many songs in playlist' });
    }

    const playlist = new Playlist({
      user: req.user._id || req.user.id,
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
      console.log("Requesting User:", req.user); // Debugging user
  
      if (!req.user) {
        return res.status(401).json({ error: 'User not authenticated' });
      }
  
      const { playlistId } = req.params;
      const { songId } = req.body;
  
      // Validate playlistId as a MongoDB ObjectId
      if (!mongoose.isValidObjectId(playlistId)) {
        return res.status(400).json({ error: 'Invalid playlist ID' });
      }
  
      const playlist = await Playlist.findById(playlistId);
      if (!playlist) {
        return res.status(404).json({ error: 'Playlist not found' });
      }
  
      console.log("playlistId:", playlistId, "songId:", songId);
  
      // Check user ownership or public access
      if (playlist.user.toString() !== req.user.id && !playlist.isPublic) {
        return res.status(403).json({ error: 'Unauthorized to modify this playlist' });
      }
  
      // Find the song by `songId` (stored as a string in the Song schema)
      const song = await Song.findOne({ songId: songId }); // Finds song based on Spotify ID
      if (!song) {
        return res.status(404).json({ error: 'Song not found' });
      }
      
  
      // Add song if it's not already in the playlist
      if (!playlist.songs.includes(songId)) {
        playlist.songs.push(songId);
        await playlist.save();
      }
  
      res.json(playlist);
    } catch (error) {
      console.error("Error adding song:", error); // Log full error
      res.status(500).json({ error: 'Failed to add song to playlist', details: error.message });
    }
  };
  
  

// Remove song from playlist
export const removeSongFromPlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;
    const { songId } = req.body;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    // Check user ownership or public access
    if (playlist.user.toString() !== req.user._id.toString() && !playlist.isPublic) {
      return res.status(403).json({ error: 'Unauthorized to modify this playlist' });
    }

    // Remove song if it exists
    playlist.songs = playlist.songs.filter(id => id.toString() !== songId);
    await playlist.save();

    res.json(playlist);
  } catch (error) {
    console.error("Error removing song:", error.message);
    res.status(500).json({ error: 'Failed to remove song from playlist' });
  }
};

// Get user's playlists
export const getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id }).limit(20); // Limiting results
    res.json(playlists);
  } catch (error) {
    console.error("Error fetching playlists:", error.message);
    res.status(500).json({ error: 'Failed to retrieve playlists' });
  }
};

// Share playlist
export const sharePlaylist = async (req, res) => {
  try {
    const { playlistId } = req.params;

    const playlist = await Playlist.findById(playlistId);
    if (!playlist) {
      return res.status(404).json({ error: 'Playlist not found' });
    }

    // Ensure the user owns the playlist
    if (playlist.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Unauthorized' });
    }

    playlist.isPublic = true;
    await playlist.save();
    res.json(playlist);
  } catch (error) {
    console.error("Error sharing playlist:", error.message);
    res.status(500).json({ error: 'Failed to share playlist' });
  }
};
