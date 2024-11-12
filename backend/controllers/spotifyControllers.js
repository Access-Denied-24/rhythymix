import {
    searchArtistByName,
    getTracksByAlbumId,
    searchAlbumByName,
    getAllAlbumsOfArtist,
    getFeaturedAlbums,
    getFeaturedPlaylists,
    searchPlaylistByName,
    getPlaylistDetailsById,
    getArtistDetailsById,
    searchSongByName,
    searchSongByGenre,
    getArtistDetailsByName
  } from '../utils/spotify.js';
  
  // get artist details by Id
  export const getArtistDetails = async (req, res) => {
    try {
      const { artistId } = req.params;
      const artistData = await getArtistDetailsById(artistId);
      res.status(200).json(artistData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch artist details' });
    }
  };

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
      console.log("Tracks Data:", data.items); 
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
      // res.json(data.albums.items);
      res.json({
        albums: {
          items: data.albums.items,
        }
      });
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

    //   const songs = data.tracks.items.map(song => ({
    //     id: song.id,
    //     name: song.name,
    //     artist: song.artists.map(artist => artist.name).join(', '),
    //     album: song.album.name,
    //     albumCover: song.album.images[0]?.url,
    //     previewUrl: song.preview_url, 
    //     spotifyUrl: song.external_urls.spotify,
    //     duration: song.duration_ms,
    //   }));
  
    //   res.json(songs);
        res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to search song' });
    }
  };
  
  //multi search in one search bar
  export const multiSearch = async (req, res) => {
    try {
        const { query } = req.query;

        
        const [artistData, albumData, songData, playlistData] = await Promise.all([
            getArtistDetailsByName(query),
            searchAlbumByName(query),
            searchSongByName(query),
            searchPlaylistByName(query),
        ]);

       
        res.json({
            artists: artistData ? [artistData] : [],  // Wrap artistData in an array if it exists
            albums: albumData?.albums?.items || [],
            songs: songData?.tracks?.items || [],
            playlists: playlistData?.playlists?.items || []
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to perform multi-search' });
    }
};


export const getSongByGenre = async (req, res) => {
  try {
    const { genre } = req.query;
    const data = await searchSongByGenre(genre);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch songs by genre' });
  }
};

  
  